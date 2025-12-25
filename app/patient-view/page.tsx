"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InputForm } from "../components/form/inputForm";
import { Dropdown } from "../components/form/dropdown";
import { TextArea } from "../components/form/textArea";
import { FormFooter } from "../components/form/formFooter";
import { io, Socket } from "socket.io-client";
import { Header } from "../components/header";

export interface PatientInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  religion: string;
  status: PatientStatus;
}

export const defaultPatientInfo: PatientInfo = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  religion: "",
  status: "Inactive",
};

interface RequiredFieldConfig {
  label: string;
  key: keyof PatientInfo;
}

const formConfig = {
  gender: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ],
  language: [
    { label: "Thai", value: "Thai" },
    { label: "English", value: "English" },
  ],
  nationality: [
    { label: "Thai", value: "Thai" },
    { label: "Other", value: "Other" },
  ],
};

const requiredFields: RequiredFieldConfig[] = [
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "dateOfBirth", label: "Date of birth" },
  { key: "gender", label: "Gender" },
  { key: "email", label: "Email address" },
  { key: "address", label: "Address" },
  { key: "preferredLanguage", label: "Preferred language" },
  { key: "nationality", label: "Nationality" },
  { key: "phoneNumber", label: "Phone number" },
];

type changeEventType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type PatientStatus = "Submitted" | "Filling in" | "Inactive";
type FormErrors = Partial<Record<keyof PatientInfo, string>>;

export default function PatientView() {
  const [patientInfo, setPatientInfo] =
    useState<PatientInfo>(defaultPatientInfo);
  const [errors, setErrors] = useState<FormErrors>({});

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (patientInfo === defaultPatientInfo) return;

    const socketTimer = setTimeout(() => {
      emitUpdate(patientInfo);
    }, 300);

    return () => clearTimeout(socketTimer);
  }, [patientInfo]);

  useEffect(() => {
    if (patientInfo.status === "Submitted" || patientInfo.status === "Inactive")
      return;

    const idleTimer = setTimeout(() => {
      const updated: PatientInfo = { ...patientInfo, status: "Inactive" };
      setPatientInfo(updated);
    }, 5000);

    return () => clearTimeout(idleTimer);
  }, [patientInfo]);

  const emitUpdate = (data: PatientInfo) => {
    socketRef.current?.emit("patient_update", data);
  };

  const handleChange = (e: ChangeEvent<changeEventType>) => {
    const { name, value } = e.target;
    const updated: PatientInfo = {
      ...patientInfo,
      [name]: value,
      status: "Filling in",
    };
    setPatientInfo(updated);
    emitUpdate(updated);

    if (errors[name as keyof PatientInfo]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof PatientInfo];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;

    if (value.length > 3 && value.length <= 6) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    }
    const updated: PatientInfo = {
      ...patientInfo,
      phoneNumber: formattedValue,
      status: "Filling in",
    };
    setPatientInfo(updated);
    emitUpdate(updated);

    if (errors.phoneNumber) {
      setErrors((prev) => {
        const { phoneNumber, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const info = patientInfo;

    requiredFields.forEach((e) => {
      if (!info[e.key]?.toString().trim()) {
        newErrors[e.key] = `${e.label} is required`;
      }
    });

    if (info.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      newErrors.email = "Invalid email format";
    }

    const purePhone = info.phoneNumber.replace(/\D/g, "");
    if (purePhone && purePhone.length < 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    const { emergencyContactName: eName, emergencyContactRelationship: eRel } =
      info;
    if (eName && !eRel)
      newErrors.emergencyContactRelationship = "Relationship is required";
    if (eRel && !eName) newErrors.emergencyContactName = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all data?")) {
      setPatientInfo(defaultPatientInfo);
      emitUpdate(defaultPatientInfo);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const updated: PatientInfo = { ...patientInfo, status: "Submitted" };
      setPatientInfo(updated);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const updated: PatientInfo = { ...patientInfo, status: "Inactive" };
      setPatientInfo(updated);
    }
  };

  return (
    <>
      <Header text="PATIENT PROFILE" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <InputForm
          type="text"
          label="First Name"
          name="firstName"
          placeholder="Enter first name"
          value={patientInfo.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <InputForm
          type="text"
          label="Middle Name"
          name="middleName"
          placeholder="Enter middle name"
          value={patientInfo.middleName}
          onChange={handleChange}
        />

        <InputForm
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Enter last name"
          value={patientInfo.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <InputForm
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={patientInfo.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        <Dropdown
          options={formConfig.gender}
          name="gender"
          label="Gender"
          value={patientInfo.gender}
          onChange={handleChange}
          error={errors.gender}
        />

        <InputForm
          type="tel"
          label="Phone Number"
          name="phoneNumber"
          placeholder="081-234-5678"
          value={patientInfo.phoneNumber}
          onChange={handlePhoneChange}
          error={errors.phoneNumber}
        />

        <InputForm
          type="email"
          label="Email Address"
          name="email"
          placeholder="example@mail.com"
          value={patientInfo.email}
          onChange={handleChange}
          error={errors.email}
        />

        <TextArea
          name="address"
          label="Address"
          placeholder="House No., Village, Street..."
          value={patientInfo.address}
          onChange={handleChange}
          error={errors.address}
        />

        <Dropdown
          options={formConfig.language}
          name="preferredLanguage"
          label="Preferred Language"
          value={patientInfo.preferredLanguage}
          onChange={handleChange}
          error={errors.preferredLanguage}
        />

        <Dropdown
          options={formConfig.nationality}
          name="nationality"
          label="Nationality"
          value={patientInfo.nationality}
          onChange={handleChange}
          error={errors.nationality}
        />

        <InputForm
          type="text"
          label="Religion"
          name="religion"
          placeholder="Enter religion"
          value={patientInfo.religion}
          onChange={handleChange}
        />

        <div className="col-span-full mt-4 ">
          <p className="mb-2 text-sm font-small text-gray-700">
            Emergency Contact
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg border border-gray-200">
            <InputForm
              type="text"
              label="Name"
              name="emergencyContactName"
              placeholder="Enter name"
              value={patientInfo.emergencyContactName}
              onChange={handleChange}
              error={errors.emergencyContactName}
            />
            <InputForm
              type="text"
              label="Relationship"
              name="emergencyContactRelationship"
              placeholder="Enter relationship"
              value={patientInfo.emergencyContactRelationship}
              onChange={handleChange}
              error={errors.emergencyContactRelationship}
            />
          </div>
        </div>

        <FormFooter onClear={handleClear} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
