import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import "./CourseDetails.css";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fakeCoursesDb = [
  {
    id: 1,
    code: "CS101",
    name: "Intro to Computer Science",
    room: "A101",
    instructor: "John Doe",
    days: ["Mon", "Wed", "Fri"],
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "Basics of CS",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures",
    room: "B202",
    instructor: "Jane Smith",
    days: ["Tue", "Thu"],
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    description: "DS and algos",
  },
];

const CourseDetails = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    code: "",
    name: "",
    room: "",
    instructor: "",
    days: [],
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      const fetchCourse = async () => {
        await delay(500);
        const found = fakeCoursesDb.find((c) => String(c.id) === String(id));
        if (found) setForm(found);
        setLoading(false);
      };
      fetchCourse();
    }
  }, [id, isEdit]);

  const toggleDay = (day) => {
    setForm((prev) => {
      const has = prev.days.includes(day);
      return {
        ...prev,
        days: has ? prev.days.filter((d) => d !== day) : [...prev.days, day],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await delay(700);
    setLoading(false);
    navigate("/admin/courses");
  };

  return (
    <>
      <Menu admin={true} />

      <div className="course-details-page page-padding">
        <div className="details-card">
          <h2>{isEdit ? "Edit Course" : "Create Course"}</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="details-form">
              <div className="row">
                <label>Course Code</label>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <label>Course Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <label>Room</label>
                <input
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <label>Instructor</label>
                <input
                  name="instructor"
                  value={form.instructor}
                  onChange={handleChange}
                />
              </div>

              <div className="row days-row">
                <label>Weekdays</label>
                <div className="days-group">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                    <label
                      key={d}
                      className={`day-checkbox ${
                        form.days.includes(d) ? "checked" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.days.includes(d)}
                        onChange={() => toggleDay(d)}
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="row">
                <label>Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <label>End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => navigate("/admin/courses")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  {isEdit ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
