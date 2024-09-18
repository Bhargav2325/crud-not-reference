import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Emp() {
  const [Depa, setDepa] = useState("");
  const [employees, setEmployees] = useState([
    { name: "", position: "", skills: [{ name: "" }] },
  ]);
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editDepIndex, setEditDepIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8030/department")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching departments." + error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);

    return () => clearTimeout(timer);
  }, [Depa, employees]);

  const handleSkillChange = (e, empIndex, skillIndex) => {
    const newEmployees = [...employees];
    newEmployees[empIndex].skills[skillIndex].name = e.target.value;
    setEmployees(newEmployees);
  };

  const handleEmployeeChange = (e, empIndex, field) => {
    const newEmployees = [...employees];
    newEmployees[empIndex][field] = e.target.value;
    setEmployees(newEmployees);
  };

  const handleAddSkill = (empIndex) => {
    const newEmployees = [...employees];
    newEmployees[empIndex].skills.push({ name: "" });
    setEmployees(newEmployees);
  };

  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      { name: "", position: "", skills: [{ name: "" }] },
    ]);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();

    const department = {
      name: Depa,
      employees: employees,
    };

    if (editMode) {
      const departmentId = departments[editDepIndex].id;
      fetch(`http://localhost:8030/department/${departmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
      })
        .then((response) => response.json())
        .then((updatedDepartment) => {
          const newDepartments = [...departments];
          newDepartments[editDepIndex] = updatedDepartment;
          setDepartments(newDepartments);
          setEditMode(false);
          setEditDepIndex(null);
        })
        .catch((error) => toast.error("Error updating department:", error));
    } else {
      fetch("http://localhost:8030/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
      })
        .then((response) => response.json())
        .then((newDepartment) => {
          setDepartments([...departments, newDepartment]);
        })
        .catch((error) => toast.error("Error adding department.", error));
    }

    setDepa("");
    setEmployees([{ name: "", position: "", skills: [{ name: "" }] }]);
  };

  const handleEditDepartment = (depIndex) => {
    const department = departments[depIndex];
    setDepa(department.name);
    setEmployees(department.employees);
    setEditMode(true);
    setEditDepIndex(depIndex);
  };

  const handleDeleteDepartment = (depIndex) => {
    const departmentId = departments[depIndex].id;
    fetch(`http://localhost:8030/department/${departmentId}`, {
      method: "DELETE",
    })
      .then(() => {
        const newDepartments = [...departments];
        newDepartments.splice(depIndex, 1);
        setDepartments(newDepartments);
      })
      .catch((error) => toast.error("Error deleting department."));
  };

  if (isLoading) {
    return (
      <div className="items-center flex justify-center my-5">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-5 bg-gray-200">
      <div className="max-w-7xl mx-auto bg-gray-300 py-5 mb-5 px-5 top-10 rounded-md shadow-md">
        <form
          onSubmit={handleAddDepartment}
          className="flex flex-col justify-center items-center py-5"
        >
          <h1 className="text-3xl mb-10 text-gray-700">
            {editMode ? "Edit Department" : "Create New Department"}
          </h1>

          {/* Department Input */}
          <input
            className="text-md py-2 rounded-md px-4 mb-4"
            placeholder="Enter Department Name..."
            type="text"
            value={Depa}
            onChange={(e) => setDepa(e.target.value)}
          />

          {/* Employee Section */}
          {employees.map((employee, empIndex) => (
            <div
              key={empIndex}
              className="mb-5 p-4 bg-white rounded shadow-md w-full"
            >
              <h2 className="text-xl mb-3">Employee {empIndex + 1}</h2>

              {/* Employee Name */}
              <input
                className="text-md py-2 rounded-md px-4 mb-2 w-full"
                placeholder="Enter Employee Name..."
                type="text"
                value={employee.name}
                onChange={(e) => handleEmployeeChange(e, empIndex, "name")}
              />

              {/* Employee Position */}
              <input
                className="text-md py-2 rounded-md px-4 mb-2 w-full"
                placeholder="Enter Employee Position..."
                type="text"
                value={employee.position}
                onChange={(e) => handleEmployeeChange(e, empIndex, "position")}
              />

              {/* Skills Section */}
              {employee.skills.map((skill, skillIndex) => (
                <input
                  key={skillIndex}
                  className="text-md py-2 rounded-md px-4 mb-2 w-full"
                  placeholder="Enter Skill Name..."
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(e, empIndex, skillIndex)}
                />
              ))}

              {/* Add Skill Button */}
              <button
                type="button"
                onClick={() => handleAddSkill(empIndex)}
                className="px-4 rounded-md my-2 text-white py-2 bg-gray-600"
              >
                Add Skill
              </button>
            </div>
          ))}

          {/* Add Employee Button */}
          <button
            type="button"
            onClick={handleAddEmployee}
            className="px-4 rounded-md text-white py-2 bg-sky-500 mb-4"
          >
            Add Employee
          </button>

          {/* Add Department Button */}
          <button
            type="submit"
            className="px-4 rounded-md text-white py-2 bg-green-500"
          >
            {editMode ? "Update Department" : "Add Department"}
          </button>
        </form>
      </div>

      {/* Display Departments and Employees */}
      <div className="max-w-7xl mx-auto bg-gray-300 pb-5 px-5 top-10 rounded-md shadow-md">
        {departments.map((department, depIndex) => (
          <div key={depIndex} className="flex flex-col justify-start py-5 px-4">
            <div className="my-2 text-xl font-bold">{department.name}</div>
            {department.employees.map((employee, empIndex) => (
              <div key={empIndex} className="my-1">
                {employee.name} - {employee.position}
                <div className="flex px-2 flex-col">
                  {employee.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>{skill.name}</li>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-start gap-4 items-center mt-2">
              <button
                type="button"
                onClick={() => handleEditDepartment(depIndex)}
                className="px-4 rounded-md text-white py-2 bg-yellow-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteDepartment(depIndex)}
                className="px-4 rounded-md text-white py-2 bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emp;
