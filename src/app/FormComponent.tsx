// components/FormComponent.tsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

// Define the types for the form fields
interface EmailField {
  value: string;
}

interface FormValues {
  name: string;
  email: string;
  username: string;
  emails: EmailField[];
  comments?: string;
  gender: string;
  file: FileList;
}

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    console.log("Selected date:", startDate);
    alert("Form submitted! Check the console for submitted values.");
  };

  const checkUsername = async (username: string) => {
    // Simulate an API call to check username availability
    setTimeout(() => {
      setIsUsernameValid(username !== "takenUsername");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}
    >
      <div>
        <label>Name:</label>
        <input {...register("name", { required: true })} />
        {errors.name && <p>Name is required</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
        />
        {errors.email && <p>Please enter a valid email address</p>}
      </div>

      <div>
        <label>Date of Birth:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div>
        <label>Username:</label>
        <input
          {...register("username", { required: true })}
          onBlur={(e) => checkUsername(e.target.value)}
        />
        {!isUsernameValid && <p>Username is already taken</p>}
      </div>

      <div>
        <label>Additional Emails:</label>
        {fields.map((item, index) => (
          <div key={item.id}>
            <input {...register(`emails.${index}.value` as const)} />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ value: "" })}>
          Add Email
        </button>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => setShowComments(!showComments)}
          />
          Add Comments
        </label>
        {showComments && (
          <div>
            <label>Comments:</label>
            <textarea {...register("comments")} />
          </div>
        )}
      </div>

      <div>
        <label>Gender:</label>
        <select {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Upload File:</label>
        <input type="file" {...register("file")} />
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
}
