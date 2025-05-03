"use server";

import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "../../amplify_outputs.json";

// Create the server runner
export const { runWithAmplifyServerContext } = createServerRunner({
  config
});

export const fetchSessionFromServer = async () => {
    const currentSession = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    return currentSession;
};

export const fetchUserFromServer = async () => {
    const currentUser = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    console.log("currentUser", currentUser);
    return currentUser;
};
