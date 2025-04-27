'use client';

import { useState } from 'react';
import { useAuth } from '@/app/auth/auth-provider';
import { useRouter } from 'next/navigation';

export default function AuthSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="auth-settings-page">
      <h1>User Settings</h1>
      <p>Customize your account settings and preferences</p>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Notification Settings</h2>

          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <span className="toggle-text">Email Notifications</span>
            </label>
            <p className="setting-description">
              Receive email notifications for important updates and activities
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>

          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="toggle-text">Dark Mode</span>
            </label>
            <p className="setting-description">
              Enable dark mode for a better experience in low-light environments
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Language</h2>

          <div className="setting-item">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="japanese">Japanese</option>
            </select>
            <p className="setting-description">
              Choose your preferred language for the interface
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account Security</h2>

          <div className="setting-item">
            <button className="security-button">
              Change Password
            </button>
            <p className="setting-description">
              Update your password to maintain account security
            </p>
          </div>

          {user?.isAdmin && (
            <div className="setting-item">
              <button className="security-button admin-button">
                Advanced Security Settings
              </button>
              <p className="setting-description">
                Configure advanced security options (admin only)
              </p>
            </div>
          )}
        </div>

        <div className="settings-actions">
          {saveMessage && (
            <div className="save-message success">
              {saveMessage}
            </div>
          )}

          <button
            onClick={handleSave}
            className="save-button"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>

          <button
            onClick={() => router.push('/auth/dashboard')}
            className="back-button"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
