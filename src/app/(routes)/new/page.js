import { Button, Input, Textarea } from "@nextui-org/react";

export default function NewCampground() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-10">Create new campground</h2>
      <form>
        <div className="flex flex-col gap-5 ">
          <Input type="text" label="Title" isRequired />
          <Textarea label="Description" isRequired />
          <Input type="price" label="Price" isRequired />
          <Input type="text" label="Location" isRequired />
          <Button color="primary" className="w-40">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
