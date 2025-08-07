"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaReact, FaNodeJs, FaPython, FaDatabase, FaCss3Alt, FaBolt,
  FaHeading, FaKeyboard, FaLink, FaGithub, FaTags, FaImage
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiFramer, SiDjango, SiPostgresql
} from "react-icons/si";

const TECH_STACK_OPTIONS = [
  { label: "React", value: "react", icon: <FaReact className="text-cyan-400" /> },
  { label: "Next.js", value: "nextjs", icon: <SiNextdotjs className="text-white" /> },
  { label: "Tailwind CSS", value: "tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
  { label: "Framer Motion", value: "framer-motion", icon: <SiFramer className="text-pink-500" /> },
  { label: "Django", value: "django", icon: <SiDjango className="text-green-500" /> },
  { label: "PostgreSQL", value: "postgresql", icon: <SiPostgresql className="text-blue-400" /> },
  { label: "Node.js", value: "nodejs", icon: <FaNodeJs className="text-green-400" /> },
  { label: "GSAP", value: "gsap", icon: <FaBolt className="text-yellow-300" /> },
];

export default function ProjectForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    imageFile: null,
    liveUrl: "",
    githubUrl: "",
    iconNames: [],
  });

  const [previewImage, setPreviewImage] = useState(null);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        imageFile: null,
        liveUrl: initialData.live_url || "",
        githubUrl: initialData.github_url || "",
        iconNames: initialData.icon_names || [],
      });
      setPreviewImage(initialData.image || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, imageFile: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleIcon = (techValue) => {
    setForm((prev) => {
      const exists = prev.iconNames.includes(techValue);
      return {
        ...prev,
        iconNames: exists
          ? prev.iconNames.filter((val) => val !== techValue)
          : [...prev.iconNames, techValue],
      };
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      imageFile: null,
      liveUrl: "",
      githubUrl: "",
      iconNames: [],
    });
    setPreviewImage(null);
    const imageInput = document.getElementById("imageFile");
    if (imageInput) imageInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug || (!form.imageFile && !isEditing)) {
      toast.error("⚠️ Title, slug, and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    if (form.imageFile) formData.append("image", form.imageFile);
    formData.append("live_url", form.liveUrl);
    formData.append("github_url", form.githubUrl);
    form.iconNames.forEach((name) => formData.append("icon_names", name));

    try {
      await onSubmit(formData);
      toast.success(isEditing ? "✅ Project updated!" : "✅ Project uploaded!");
      if (!isEditing) resetForm();
    } catch (err) {
      toast.error("❌ Failed to submit project.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 neon-glass max-w-4xl mx-auto mt-10 border border-purple-600 rounded-2xl shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className="text-4xl font-bold text-center glitch neon-text mb-6"
        data-text={isEditing ? "Edit Project" : "New Project"}
      >
        {isEditing ? "Edit Project" : "New Project"}
      </h2>

      {/* Input Fields */}
      {[
        ["title", "Title", <FaHeading />],
        ["slug", "Slug", <FaKeyboard />],
        ["liveUrl", "Live URL", <FaLink />],
        ["githubUrl", "GitHub URL", <FaGithub />],
      ].map(([name, label, icon]) => (
        <div key={name} className="space-y-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-neon-blue">
            {icon} {label}
          </label>
          <input
            type="text"
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full p-3 bg-[#121232] border border-purple-600 rounded-md text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      ))}

      {/* Description */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-neon-blue">
          <FaTags /> Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the project in detail..."
          className="w-full p-3 bg-[#121232] border border-purple-600 rounded-md text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-neon-blue">
          <FaImage /> {isEditing ? "Change Image" : "Upload Image"}
        </label>
        <input
          id="imageFile"
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 bg-[#121232] border border-purple-600 rounded-md text-white"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 rounded-lg h-48 object-cover border border-purple-700 shadow-md"
          />
        )}
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-neon-blue">
          <FaTags /> Tech Stack
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {TECH_STACK_OPTIONS.map((tech) => (
            <button
              key={tech.value}
              type="button"
              onClick={() => toggleIcon(tech.value)}
              className={`flex items-center justify-center gap-2 p-3 border rounded-lg transition text-sm
                ${
                  form.iconNames.includes(tech.value)
                    ? "bg-purple-700 border-purple-500 shadow-md"
                    : "bg-[#121232] border-purple-600 hover:border-purple-400"
                }`}
            >
              {tech.icon}
              <span>{tech.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-purple-300 mt-1">
          Click icons to select tech stack
        </p>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <motion.button
          type="submit"
          className="btn-glow bg-purple-700 hover:bg-purple-800 transition px-6 py-3 text-lg rounded-xl font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? "Update Project" : "Upload Project"}
        </motion.button>
      </div>
    </motion.form>
  );
}
