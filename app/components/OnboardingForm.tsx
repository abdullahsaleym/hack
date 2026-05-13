"use client";

import { useState } from "react";

interface OnboardingData {
  name: string;
  background: string;
  goal: string;
  experience: string;
  age: string;
}

interface OnboardingFormProps {
  onSubmit: (data: OnboardingData) => void;
  isLoading: boolean;
}

export default function OnboardingForm({
  onSubmit,
  isLoading,
}: OnboardingFormProps) {
  const [form, setForm] = useState<OnboardingData>({
    name: "",
    background: "",
    goal: "",
    experience: "",
    age: "",
  });

  const [errors, setErrors] = useState<Partial<OnboardingData>>({});

  const validate = () => {
    const newErrors: Partial<OnboardingData> = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!form.background) newErrors.background = "Please select your background";
    if (!form.goal) newErrors.goal = "Please select your goal";
    if (!form.experience) newErrors.experience = "Please select your experience level";
    if (!form.age) newErrors.age = "Please select your age group";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OnboardingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClass = (field: keyof OnboardingData) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:ring-teal-200 focus:border-teal-400 bg-white"
    }`;

  return (
    <div className="fade-in w-full max-w-xl mx-auto">
      {/* Hero section */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ backgroundColor: "#f0fdfa", color: "#0d9488" }}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          AI-Powered Course Matching
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
          Find Your Perfect
          <br />
          <span style={{ color: "#0d9488" }}>Learning Path</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          Answer 5 quick questions and our AI will recommend the best
          atomcamp course for your background and goals.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: "10,000+", label: "Learners Trained" },
          { value: "80%", label: "Job Placement" },
          { value: "45%", label: "Women Learners" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm"
          >
            <div
              className="text-lg font-black"
              style={{ color: "#0d9488" }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name <span style={{ color: "#0d9488" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Fatima Khan"
              className={inputClass("name")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Educational Background <span style={{ color: "#0d9488" }}>*</span>
            </label>
            <select
              name="background"
              value={form.background}
              onChange={handleChange}
              className={inputClass("background")}
              disabled={isLoading}
            >
              <option value="">Select your background...</option>
              <option value="STEM / CS / Engineering graduate">
                STEM / CS / Engineering
              </option>
              <option value="Business / Commerce / Finance">
                Business / Commerce / Finance
              </option>
              <option value="Arts / Humanities / Social Sciences">
                Arts / Humanities / Social Sciences
              </option>
              <option value="Medical / Healthcare">Medical / Healthcare</option>
              <option value="Currently in school (age 13-18)">
                Currently in school (age 13–18)
              </option>
              <option value="Other degree or background">
                Other degree or background
              </option>
            </select>
            {errors.background && (
              <p className="text-red-500 text-xs mt-1">{errors.background}</p>
            )}
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Career Goal <span style={{ color: "#0d9488" }}>*</span>
            </label>
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className={inputClass("goal")}
              disabled={isLoading}
            >
              <option value="">What do you want to achieve?</option>
              <option value="Get a job in AI or Data Science">
                Get a job in AI / Data Science
              </option>
              <option value="Upskill at my current job">
                Upskill at my current job
              </option>
              <option value="Start freelancing on Upwork">
                Start freelancing on Upwork
              </option>
              <option value="Build AI-powered automation for my business">
                Build AI automation for my business
              </option>
              <option value="Explore AI as a teenager">
                Explore AI as a teenager
              </option>
              <option value="Transition into tech from another field">
                Transition into tech from another field
              </option>
            </select>
            {errors.goal && (
              <p className="text-red-500 text-xs mt-1">{errors.goal}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Experience Level <span style={{ color: "#0d9488" }}>*</span>
            </label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className={inputClass("experience")}
              disabled={isLoading}
            >
              <option value="">How much do you know already?</option>
              <option value="Complete beginner — no coding or tech experience">
                Complete beginner — no coding experience
              </option>
              <option value="Some coding experience — know basics of Python or similar">
                Some coding — know Python basics
              </option>
              <option value="Intermediate developer — comfortable with Python and APIs">
                Intermediate — comfortable with Python & APIs
              </option>
              <option value="Working professional — want to automate workflows with AI">
                Working professional — want to automate with AI
              </option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Age Group <span style={{ color: "#0d9488" }}>*</span>
            </label>
            <select
              name="age"
              value={form.age}
              onChange={handleChange}
              className={inputClass("age")}
              disabled={isLoading}
            >
              <option value="">Select your age group...</option>
              <option value="13–17 (Teen)">13–17 (Teen)</option>
              <option value="18–25">18–25</option>
              <option value="26–35">26–35</option>
              <option value="36+">36+</option>
            </select>
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            style={{ backgroundColor: "#0d9488" }}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner"></span>
                AI is building your path...
              </>
            ) : (
              <>
                <span>✨</span>
                Get My Personalised Learning Path
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Classes run Mon / Tue / Thu · 7–9 PM on Google Meet ·{" "}
          <a
            href="mailto:admissions@atomcamp.com"
            className="underline hover:text-gray-600"
          >
            admissions@atomcamp.com
          </a>
        </p>
      </div>
    </div>
  );
}
