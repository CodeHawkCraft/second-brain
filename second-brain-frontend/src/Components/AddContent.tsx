import { addContentValidations, validContentType } from "../utils/validations";
import PopUp from "./PopUp";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "./ui/Button";
import { AddcontentType } from "../pages/DashboardContent";
import { createContent } from "../api/contentApi";
import { CardProps } from "./Card";
type AddContentProps = {
  onClose: () => void;
  onAdd: (response:CardProps) => void;
};

const formFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter your Title",
  },
  {
    name: "description",
    label: "Description",
    as: "textarea",
    placeholder:
      "Enter a meaningful description to help you find your content easily",
  },
  {
    name: "type",
    label: "Type",
    as: "select",
    options: validContentType,
  },
];

const fieldClasses = "p-4 rounded-md w-full border outline-none";
const AddContent = ({ onClose,onAdd }: AddContentProps) => {
  return (
      <PopUp
        onClose={onClose}
        title={<h1 className="font-bold text-2xl ">Add Content</h1>}
        children={
          <Formik
            initialValues={{
              title: "",
              content: "",
              type: validContentType[0],
              description: "",
            }}
            validationSchema={addContentValidations}
            onSubmit={async(values:AddcontentType) => {
            const response=  await createContent(values) as CardProps;
            onAdd(response);
            onClose();
            }}
          >
            {({ values ,isSubmitting}) => {
              return (
                <Form className="flex flex-col gap-5">
                  {formFields.map(
                    ({
                      name,
                      label,
                      as = "input",
                      type,
                      placeholder,
                      options,
                    }) => {
                      return (
                        <div key={name} className="flex flex-col gap-2">
                          <label htmlFor={name} className="requiredLabel">
                            {label}
                          </label>
                          {as === "select" ? (
                            <Field
                              as="select"
                              name={name}
                              className={fieldClasses}
                            >
                              {options?.map((entry) => (
                                <option key={entry} value={entry}>
                                  {entry}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              as={as}
                              name={name}
                              id={name}
                              type={type}
                              placeholder={placeholder}
                              className={fieldClasses}
                            />
                          )}
                          <ErrorMessage
                            name={name}
                            component="div"
                            className="text-sm text-wrap text-red-600"
                          />
                        </div>
                      );
                    }
                  )}

                  {/* content */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="requiredLabel ">
                      Content
                    </label>
                    {values.type == "other" ? (
                      <Field
                        as="textarea"
                        placeholder="Enter a meaningful description to help you find your content easily"
                        name="content"
                        className="p-4 rounded-md w-full border outline-none"
                      ></Field>
                    ) : (
                      <Field
                        name="content"
                        id="content"
                        placeholder="Enter your Content"
                        type="text"
                        className="p-4 rounded-md w-full outline-none border"
                      />
                    )}
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="text-sm text-wrap text-red-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    widthFull
                    variant="primary"
                    text="Create Content"
                  />
                </Form>
              );
            }}
          </Formik>
        }
      ></PopUp>
  );
};

export default AddContent;
