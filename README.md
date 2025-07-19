# JSON Schema Builder

A dynamic React-based web application that allows users to visually create and preview JSON schemas through an intuitive form interface. Built with TypeScript and Ant Design, this tool enables the creation of deeply nested schemas with instant form previews and schema outputs.

## 🚀 Features

* ✅ Add/edit/remove fields dynamically
* 🔁 Support for nested fields (recursive structure)
* 📦 Real-time JSON schema preview
* 🧪 Sample form auto-generated based on the current schema
* 🧼 Form submission and reset functionality
* ⚛️ Built with React + TypeScript + React Hook Form
* 🎨 UI components powered by Ant Design

## 📸 Demo

Experience the live demo of the application on Vercel: [JSON Schema Builder](https://json-schema-builder-s54m.vercel.app/)

<img width="1336" height="612" alt="image" src="https://github.com/user-attachments/assets/0c02096f-f533-4fa8-b9bf-23c19330b452" />

* On clicking the ``Submit`` button:

<img width="568" height="337" alt="image" src="https://github.com/user-attachments/assets/462743af-1fce-4c9a-9465-e4374f85968d" />

---

## 🧰 Tech Stack

* **React** (with TypeScript)
* **React Hook Form** – for managing form state
* **Ant Design** – for sleek UI components
* **Vite** (assumed build tool)

---

## 🧑‍💻 Getting Started

### Prerequisites

* Node.js ≥ 14
* npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/namanrox/json-schema-builder.git
cd json-schema-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to open the app.

---

## 📤 Usage

1. Click `+ Add Field` to add a new field.
2. Enter the **field name** and select its **type** (`string`, `number`, or `nested`).
3. For nested types, you can further add inner fields.
4. Fill out the preview form and click `Submit` to view formatted form data.
5. You can also reset the sample input fields by clicking on the ``Reset`` button.
6. View the generated JSON schema on the right panel.
