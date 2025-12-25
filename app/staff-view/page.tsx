"use client";
import { useEffect, useRef, useState } from "react";
import {
  PatientInfo,
  PatientStatus,
  defaultPatientInfo,
} from "../patient-view/page";
import { io, Socket } from "socket.io-client";
import { LabelWithText } from "../components/labelWithText";
import { Dashboard } from "../components/dashboard";
import { Header } from "../components/header";

const getStatusColor = (status: PatientStatus) => {
  switch (status) {
    case "Submitted":
      return "text-emerald-400";
    case "Filling in":
      return "text-amber-400";
    case "Inactive":
      return "text-slate-400";
    default:
      return "text-teal-400";
  }
};

export default function StaffView() {
  const [patientInfo, setPatientInfo] =
    useState<PatientInfo>(defaultPatientInfo);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001");
    socketRef.current.on("staff_receive", (data: PatientInfo) => {
      if (!data) throw new Error("Data is not valid");
      setPatientInfo(data);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <Header text="STAFF MODE" />
      <Dashboard
        header="Pantient Profile"
        rightHeader={patientInfo.status}
        rightHeaderColor={getStatusColor(patientInfo.status)}
        labelRightHeader="Status"
      >
        <div className="p-6 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <section className="space-y-4">
              <LabelWithText label="First Name" text={patientInfo.firstName} />
              <LabelWithText
                label="Middle Name"
                text={patientInfo.middleName}
              />
              <LabelWithText label="Last Name" text={patientInfo.lastName} />
              <LabelWithText
                label="Date Of Birth"
                text={patientInfo.dateOfBirth}
              />
              <LabelWithText label="Gender" text={patientInfo.gender} />
              <LabelWithText
                label="Phone Number"
                text={patientInfo.phoneNumber}
              />
            </section>

            <section className="space-y-4">
              <LabelWithText label="Email" text={patientInfo.email} />
              <LabelWithText label="Address" text={patientInfo.address} />
              <LabelWithText
                label="Preferred Language"
                text={patientInfo.preferredLanguage}
              />
              <LabelWithText
                label="Nationality"
                text={patientInfo.nationality}
              />
              <LabelWithText label="Religion" text={patientInfo.religion} />
            </section>

            <div className="md:col-span-2">
              <p className="text-slate-500 text-xs sm:text-sm font-medium sm:w-35 shrink-0 mb-2">
                Emergency Contact
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl border border-slate-200">
                <LabelWithText
                  label="Name"
                  text={patientInfo.emergencyContactName}
                />
                <LabelWithText
                  label="Relationship"
                  text={patientInfo.emergencyContactRelationship}
                />
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
