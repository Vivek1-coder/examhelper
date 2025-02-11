"use client";
import AddGroup from "@/components/Add/AddGroup";
import AddGroupMember from "@/components/Add/AddGroupMember";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/card2/Card";
import Navbar from "@/components/Navbar/Navbar";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { NameCard } from "@/components/card2/NameCard";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const subjectId = params?.subjectId;

  // **State Variables**
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [admin, setAdmin] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [memberNames, setMemberNames] = useState([]);

  // **Capitalize Function**
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // **Fetch Membership Status**
  const checkMember = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/group/is-member?subjectId=${subjectId}`
      );

      if (response.data.message === "Member") {
        setIsMember(true);
        setAdmin(response.data.adminName || "");
        setGroupName(capitalize(response.data.groupName || ""));
      }
    } catch (error) {
      toast({ title: "Error", description: "Member fetching failed" });
    }
  }, [subjectId, toast]);

  // **Fetch Group Creation Status**
  const checkGroupCreated = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/group/isgroup-created?subjectId=${subjectId}`
      );

      if (response.data.message === "Admin") {
        setIsGroupCreated(true);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to check group status" });
    }
  }, [subjectId, toast]);

  // **Fetch Subject Visibility**
  const fetchStatus = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/subject/get-status?subjectId=${subjectId}`
      );

      if (response.data.message === "Public") {
        setIsPublic(true);
      }
    } catch (error) {
      console.error("Failed to fetch subject status", error);
    }
  }, [subjectId]);

  // **Fetch All Members**
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `/api/group/all-members?subjectId=${subjectId}`
      );
      setMemberNames(response.data.members);
      toast({
        title: "Success",
        description: "Group members fetched successfully",
      });
    } catch (error) {
      toast({ title: "Error", description: "Error fetching members" });
    }
  };

  // **Refresh Page**
  const reloadPage = () => router.refresh();

  // **Run API Calls on Component Mount**
  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);
    Promise.all([checkGroupCreated(), checkMember(), fetchStatus()]).finally(
      () => setLoading(false)
    );
  }, [subjectId, checkGroupCreated, checkMember, fetchStatus]);

  return (
    <div>
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <div className="w-screen md:h-screen flex flex-wrap justify-center items-center gap-10 max-md:py-28">
        {/* Add Group Section */}
        <TooltipProvider delayDuration={100}> 
          <div className="fixed right-3 top-20">
            {!isPublic &&
              !loading &&
              (isGroupCreated ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <AddGroupMember onAdd={checkGroupCreated} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Add Group Member</TooltipContent>
                </Tooltip>
              ) : (
                !isMember && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <AddGroup onAdd={checkMember} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Create Group</TooltipContent>
                  </Tooltip>
                )
              ))}
          </div>
        </TooltipProvider>

        {/* Drawer for Group Members */}
        <div className="fixed left-3 top-20">
          {isMember && (
           
            <Drawer>
               <TooltipProvider delayDuration={100}> 
              <Tooltip>
              <TooltipTrigger asChild>
              <DrawerTrigger
                className="bg-white w-32 h-12 rounded-full"
                onClick={fetchMembers}
              >
                {groupName}
              </DrawerTrigger>
              </TooltipTrigger>
            <TooltipContent>View group details</TooltipContent>
            </Tooltip>
            </TooltipProvider>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{groupName} Members</DrawerTitle>
                  <DrawerDescription>Members in your Group</DrawerDescription>
                  <div className="flex">
                    {memberNames.map((member, index) => (
                      <NameCard
                        key={index}
                        membername={member}
                        admin={admin}
                        onDelete={fetchMembers}
                      />
                    ))}
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <span className="w-28 h-12 border-black border-2 p-3 rounded-full bg-black text-white">Cancel</span>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            
          )}
        </div>

        {/* Subject Cards */}
        <Card
          subjectId={subjectId as string}
          title="notes"
          subjectName="Notes"
          likes={0}
        />
        <Card
          subjectId={subjectId as string}
          title="pyqs"
          subjectName="Pyqs"
          likes={0}
        />
        <Card
          subjectId={subjectId as string}
          title="vivaq"
          subjectName="Important ques"
          likes={0}
        />
        <Card
          subjectId={subjectId as string}
          title="playlist"
          subjectName="Playlist"
          likes={0}
        />
      </div>
    </div>
  );
};

export default Page;
