"use client"
import React, { useState, useEffect } from 'react';
import productData from './productData.json';

// Product configuration types
interface OptionValue {
  id: number;
  value: string;
  priceAdjustment?: number;
}

interface TriggerValue {
  id: number;
  value: string;
}

interface ProductOption {
  id: number;
  name: string;
  required?: boolean;
  values: OptionValue[];
  subOptions?: ProductOption[];
  triggerValue?: TriggerValue;
}

interface SelectedValue {
  id: number;
  value: string;
}

interface ProductVariant {
  id: number;
  sku: string;
  basePrice: number;
  image?: string;
  selectedValues: SelectedValue[];
}

interface Product {
  id: number;
  name: string;
  options: ProductOption[];
  variants: ProductVariant[];
}

// Type for the selections state object
interface Selections {
  [optionId: number]: number; // optionId -> valueId
}

// Props for ProductConfigurator
interface ProductConfiguratorProps {
  currentVariant: ProductVariant | null;
  setCurrentVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>;
}

// ProductConfigurator main component
const ProductConfigurator = ({ currentVariant, setCurrentVariant }: ProductConfiguratorProps) => {
  // Cast the imported data with proper type
  const product = productData as unknown as Product;

  // State for tracking user selections
  const [selections, setSelections] = useState<Selections>({});

  // State for tracking available options based on current selections
  const [visibleOptions, setVisibleOptions] = useState<ProductOption[]>([]);

  // Set initial selections on component mount
  useEffect(() => {
    if (product.variants.length > 0) {
      // Initialize with the first variant using proper option-to-value mapping
      const initialSelections: Selections = {};

      // Get the first variant's selections
      const variantValues = product.variants[0].selectedValues;

      // Find the corresponding options for each value
      variantValues.forEach(value => {
        // For each value, find which option it belongs to
        const findOptionForValue = (options: ProductOption[]): boolean => {
          for (const option of options) {
            // Check if this value belongs to this option
            if (option.values.some(v => v.id === value.id)) {
              // Found it! Store as optionId -> valueId
              initialSelections[option.id] = value.id;
              return true;
            }

            // Check sub-options
            if (option.subOptions && findOptionForValue(option.subOptions)) {
              return true;
            }
          }
          return false;
        };

        findOptionForValue(product.options);
      });

      setSelections(initialSelections);
    }
  }, [product.variants, product.options]);

  // Helper function to determine which options should be visible
  const calculateVisibleOptions = (options: ProductOption[], currentSelections: Selections, parentMap: Record<number, number | null>) => {
    const result: ProductOption[] = [];

    // Recursive function to traverse options tree
    const processOptions = (opts: ProductOption[], isParentVisible = true) => {
      for (const option of opts) {
        const parentId = parentMap[option.id];
        const trigger = option.triggerValue;

        // Determine if this option should be visible
        const isTopLevel = parentId === null;
        const isTriggered = isTopLevel ||
          !trigger ||
          (currentSelections[parentId] === trigger.id);

        if (isTriggered && isParentVisible) {
          // Add this option to visible options
          result.push(option);

          // Process child options if any
          if (option.subOptions && option.subOptions.length > 0) {
            processOptions(option.subOptions, true);
          }
        } else if (option.subOptions && option.subOptions.length > 0) {
          // Process children with visibility off
          processOptions(option.subOptions, false);
        }
      }
    };

    processOptions(options);
    return result;
  };

  // Build a map of option IDs to their parent option IDs
  const buildParentMap = () => {
    const map: Record<number, number | null> = {};

    const mapParents = (options: ProductOption[], parentId: number | null = null) => {
      for (const option of options) {
        map[option.id] = parentId;

        if (option.subOptions && option.subOptions.length > 0) {
          mapParents(option.subOptions, option.id);
        }
      }
    };

    mapParents(product.options);
    return map;
  };

  // Update visible options when selections change
  useEffect(() => {
    const parentMap = buildParentMap();
    const visible = calculateVisibleOptions(product.options, selections, parentMap);
    setVisibleOptions(visible);

    // Find matching variant
    findMatchingVariant(selections);
  }, [selections, product.options]);

  // Find the variant that matches current selections
  const findMatchingVariant = (currentSelections: Selections) => {
    // Get all selected option IDs and value IDs
    const selectedValueIds = Object.values(currentSelections).map(Number);

    // Special case check for Leather selection (Material option (10) with Leather value (101))
    const isLeatherSelected = currentSelections[10] === 101;
    if (isLeatherSelected) {
      // Find the leather variant
      const leatherVariant = product.variants.find(v => v.id === 1001);
      if (leatherVariant) {
        setCurrentVariant(leatherVariant);
        return;
      }
    }

    // Normal variant matching logic for other cases
    for (const variant of product.variants) {
      const variantValueIds = variant.selectedValues.map(v => v.id);

      // Check if our selection matches this variant's required values
      const allVariantValuesSelected = variantValueIds.every(id => selectedValueIds.includes(id));
      const allSelectionsMatchVariant = selectedValueIds.every(id => variantValueIds.includes(id));
      const countMatches = variantValueIds.length === selectedValueIds.length;

      if (allVariantValuesSelected && allSelectionsMatchVariant && countMatches) {
        setCurrentVariant(variant);
        return;
      }
    }

    setCurrentVariant(null);
  };

  // Handle option selection
  const selectOption = (optionId: number, valueId: number) => {
    // Validate that this value actually belongs to this option
    let isValidSelection = false;

    // Find the option and check if valueId is among its values
    const validateSelection = (options: ProductOption[]): boolean => {
      for (const option of options) {
        if (option.id === optionId) {
          // Check if the value exists in this option's values
          isValidSelection = option.values.some(v => v.id === valueId);
          return true; // Found the option
        }

        // Check sub-options if any
        if (option.subOptions && option.subOptions.length > 0) {
          if (validateSelection(option.subOptions)) return true;
        }
      }
      return false; // Option not found
    };

    validateSelection(product.options);

    if (!isValidSelection) {
      return; // Don't update state with invalid selection
    }

    setSelections(prev => {
      // Create a copy of the current selections
      const updated = { ...prev };

      // Add or update the selected option
      updated[optionId] = valueId;

      // Special handling for Material option (ID 10)
      if (optionId === 10) {
        // Clear ALL other selections when material changes
        // This ensures Leather and Wood options don't conflict
        const materialOptionIds = Object.keys(updated).map(Number);
        for (const id of materialOptionIds) {
          // Keep only the Material option selection
          if (id !== 10) {
            delete updated[id];
          }
        }

        // If Wood is selected (value 100), pre-select the default wood type
        if (valueId === 100) {
          updated[11] = 110; // Set Wood Type to Oak
          updated[12] = 120; // Set Finish to Glossy
        }
      }
      // Special handling for Wood Type option (ID 11)
      else if (optionId === 11) {
        // Reset any child options first
        if (updated[12]) delete updated[12];

        // If Oak is selected, auto-select Glossy finish
        if (valueId === 110) {
          updated[12] = 120; // Set Finish to Glossy
        }
        // If Pine is selected, no finish is auto-selected by default
      }
      else {
        // For other options, handle normal child option resetting
        const parentMap = buildParentMap();

        // Recursive function to find and reset child options
        const resetChildOptions = (options: ProductOption[]) => {
          for (const option of options) {
            if (parentMap[option.id] === optionId) {
              // This is a direct child of the changed option - reset it
              delete updated[option.id];

              // Also reset its children
              if (option.subOptions && option.subOptions.length > 0) {
                resetChildOptions(option.subOptions);
              }
            } else if (option.subOptions && option.subOptions.length > 0) {
              // Continue checking deeper
              resetChildOptions(option.subOptions);
            }
          }
        };

        resetChildOptions(product.options);
      }

      return updated;
    });
  };

  // Calculate final price with adjustments
  const calculateFinalPrice = () => {
    if (!currentVariant) return null;

    // Start with base price
    let totalPrice = currentVariant.basePrice;

    // Add price adjustments from selected options
    Object.entries(selections).forEach(([optionId, valueId]) => {
      // Find the selected value in visible options
      for (const option of visibleOptions) {
        const selectedValue = option.values.find(v => v.id === valueId);
        if (selectedValue && selectedValue.priceAdjustment) {
          totalPrice += selectedValue.priceAdjustment;
        }
      }
    });

    return totalPrice.toFixed(2);
  };

  // Create a more direct mapping of selected options to display
  const getSelectedOptionDetails = () => {
    const details = [];

    // For each visible option
    for (const option of visibleOptions) {
      // Check if this option has a selection
      if (selections[option.id] !== undefined) {
        const valueId = selections[option.id];
        const selectedValue = option.values.find(v => v.id === valueId);

        if (selectedValue) {
          details.push({
            optionId: option.id,
            optionName: option.name,
            valueId: selectedValue.id,
            valueName: selectedValue.value,
            priceAdjustment: selectedValue.priceAdjustment || 0
          });
        }
      }
    }

    return details;
  };

  const selectedDetails = getSelectedOptionDetails();

  return (
    <div className="product-configurator">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {/* Options selection area */}
      <div className="options-container mb-8">
        <h2 className="text-xl font-semibold mb-4">Configure Your Product</h2>

        {visibleOptions.map(option => (
          <div key={option.id} className="option-group mb-4">
            <h3 className="text-lg font-medium mb-2">{option.name}:</h3>
            <div className="option-buttons flex flex-wrap gap-2">
              {option.values.map(value => (
                <button
                  key={value.id}
                  className={`
                    px-4 py-2 rounded-md border transition-colors
                    ${selections[option.id] === value.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                  `}
                  onClick={() => selectOption(option.id, value.id)}
                >
                  {value.value}
                  {value.priceAdjustment !== undefined && (
                    <span className={value.priceAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {' '}
                      {value.priceAdjustment > 0
                        ? `(+$${value.priceAdjustment.toFixed(2)})`
                        : `(-$${Math.abs(value.priceAdjustment).toFixed(2)})`}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Options Summary */}
      {/* <div className="selected-options-summary mb-8 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-3">Your Current Selections</h2>

        {selectedDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedDetails.map(detail => (
              <div key={detail.optionId} className="flex justify-between items-center p-3 bg-white rounded border shadow-sm">
                <span className="font-medium text-gray-700">{detail.optionName}:</span>
                <span className="text-blue-700 font-semibold">{detail.valueName}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 bg-white p-3 rounded">No options selected</p>
        )}
      </div> */}

      {/* Selected configuration summary */}
      <div className="configuration-summary border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Selected Configuration</h2>

        {currentVariant ? (
          <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="font-medium">SKU:</div>
              <div>{currentVariant.sku}</div>

              <div className="font-medium">Base Price:</div>
              <div>${currentVariant.basePrice.toFixed(2)}</div>

              <div className="font-medium">Final Price:</div>
              <div className="text-lg font-semibold text-blue-700">${calculateFinalPrice()}</div>
            </div>

            <div className="selected-options">
              <h3 className="text-lg font-medium mb-2">Selected Options:</h3>
              <ul className="list-disc pl-5">
                {currentVariant.selectedValues.map(value => (
                  <li key={value.id}>{value.value}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No matching variant found for the current selection.</p>
        )}
      </div>
    </div>
  );
};

export default function ProductConfiguratorPage() {
  // Lifted currentVariant state to the parent component
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);


  return (
    <div className="container mx-auto py-8 px-4">
      {currentVariant?.id}
      <br />{currentVariant?.basePrice}
      <br />{currentVariant?.sku}
      <br />{currentVariant?.image}
      <ProductConfigurator
        currentVariant={currentVariant}
        setCurrentVariant={setCurrentVariant}
      />
    </div>
  );
}
