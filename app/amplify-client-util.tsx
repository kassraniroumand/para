"use client"
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

import output from '../amplify_outputs.json'
import {Amplify} from "aws-amplify";

Amplify.configure({ ...output }, { ssr: true });
export default function ConfigureAmplifyClientSide() {
    return null;
}