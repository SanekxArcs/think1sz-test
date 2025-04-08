"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import SectionHeader from "../components/SectionHeader";
import Input from "../components/Input";
import RangeSlider from "../components/RangeSlider";
import FileInput from "../components/FileInput";
import Calendar from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";
import Button from "../components/Button";
import { FormDataType, FormErrors, Holiday } from "../types/forms";
import { useHolidays } from "../hooks/useHolidays"; // Import the hook

const FORM_STORAGE_KEY = "workout-form-data";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    lastName: "",
    email: "",
    age: 0,
    photo: null,
    date: "",
    timeSlot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const { holidays, isLoading: isLoadingHolidays } = useHolidays(); // Use the hook
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formId = "workout-application-form";

  useEffect(() => {
    const isValid =
      formData.name.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      isValidEmail(formData.email) &&
      formData.age >= 8 &&
      formData.photo !== null &&
      formData.date !== "" &&
      formData.timeSlot !== "";

    setIsDisabled(!isValid);
  }, [formData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (file: File | null) => {
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleRangeChange = (value: number) => {
    setFormData({
      ...formData,
      age: value,
    });
  };

  const handleDateSelect = (date: string, holidayInfo: Holiday | null) => {
    const isNonBookableDay =
      holidayInfo &&
      (holidayInfo.type === "NATIONAL_HOLIDAY" ||
        holidayInfo.type === "OBSERVANCE");

    setFormData({
      ...formData,
      date,
      timeSlot: isNonBookableDay ? "" : formData.timeSlot,
    });

    setShowTimeSlots(!isNonBookableDay);
  };

  const handleTimeSelect = (time: string) => {
    setFormData({
      ...formData,
      timeSlot: time,
    });
  };

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (email.trim() === "") {
      setErrors((prev) => ({ ...prev, email: undefined }));
      return;
    }

    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please use correct formatting. Example: address@email.com",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email =
        "Please use correct formatting. Example: address@email.com";
    }

    if (formData.age < 8) newErrors.age = "Minimum age is 8";
    if (!formData.photo) newErrors.photo = "Photo is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.timeSlot) newErrors.timeSlot = "Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const savedFormData = sessionStorage.getItem(FORM_STORAGE_KEY);
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData((prev) => ({
          ...parsedData,
          photo: prev.photo,
        }));

        if (parsedData.date) {
          const holidayInfo = holidays.find((h) => h.date === parsedData.date);
          const isNonBookableDay =
            holidayInfo &&
            (holidayInfo.type === "NATIONAL_HOLIDAY" ||
              holidayInfo.type === "OBSERVANCE");
          setShowTimeSlots(!isNonBookableDay);
        }
      } catch (error) {
        console.error("Error parsing saved form data:", error);
        sessionStorage.removeItem(FORM_STORAGE_KEY);
      }
    }
  }, [holidays]);

  useEffect(() => {
    const formDataToStore = {
      ...formData,
      photo: null,
    };
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formDataToStore));
  }, [formData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSubmit.append(key, value);
        }
      });

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        const responseData = await response.json();

        setSubmitSuccess(true);

        setFormData({
          name: "",
          lastName: "",
          email: "",
          age: 0,
          photo: null,
          date: "",
          timeSlot: "",
        });
        setShowTimeSlots(false);
        sessionStorage.removeItem(FORM_STORAGE_KEY);

        if (responseData.resetSuccessAfter) {
          setTimeout(() => {
            setSubmitSuccess(false);
          }, responseData.resetSuccessAfter);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] p-6">
      <main className="w-full max-w-[426px]" role="main">
        

        <h1 className="sr-only">Workout Application Form</h1>
        <form
          onSubmit={handleSubmit}
          id={formId}
          aria-label="Workout Application Form"
          noValidate
        >
          <section className="pb-10" aria-labelledby="personal-info-heading">
            <SectionHeader title="Personal Info" id="personal-info-heading" />
            <div className="space-y-4">
              <Input
                label="First Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={validateEmail}
                validateOnBlur={true}
                error={errors.email}
                required
              />
              <RangeSlider
                label="Age"
                min={8}
                max={100}
                value={formData.age}
                onChange={handleRangeChange}
              />
              <FileInput
                label="Photo"
                onChange={handleFileChange}
                error={errors.photo}
                value={formData.photo}
              />
            </div>
          </section>

          <section aria-labelledby="workout-heading">
            <SectionHeader title="Your Workout" id="workout-heading" />
            <div className="flex gap-6 flex-col lg:flex-row">
              <Calendar
                onSelectDate={handleDateSelect}
                holidays={holidays}
                error={errors.date}
                isLoadingHolidays={isLoadingHolidays}
              />
              {showTimeSlots && (
                <div aria-live="polite">
                  <TimeSlots
                    onSelectTime={handleTimeSelect}
                    selectedTime={formData.timeSlot}
                    error={errors.timeSlot}
                  />
                </div>
              )}
            </div>
          </section>

          <div className="mt-12" />
          <div aria-live="assertive" aria-atomic="true">
            <Button
              type="submit"
              label="Send Application"
              isLoading={isSubmitting}
              disabled={isDisabled}
              success={submitSuccess}
              className="w-full"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
