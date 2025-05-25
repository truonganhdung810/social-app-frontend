"use client";

import * as React from "react";

import { UserProvider } from "@/context/UserContext";
import AuthGuard from "../../../components/AuthGuard";
import { useParams } from "next/navigation";
import ProfileLayout from "./Profile";

function ProfilePage() {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <UserProvider>
        <AuthGuard>
          <div className="body-container" style={{ width: "100%" }}>
            <div className="top-nav">
              <h1>Top Navigation</h1>
            </div>
            <ProfileLayout></ProfileLayout>
          </div>
        </AuthGuard>
      </UserProvider>
    </div>
  );
}

export default ProfilePage;
