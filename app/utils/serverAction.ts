'use server'

import {apiClient} from "@/app/utils/api-client";
import { HomepageData } from "@/types/homepage";

export async function getHomePage() {
    const response = await apiClient.get<any, HomepageData>("/")
    console.log(response)
    return response
}
