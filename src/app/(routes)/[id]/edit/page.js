import actions from "@/actions";
import { auth } from "@/libs/auth";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";

export default async function EditCampgroundPage({ params }) {
  const campground = await actions.getCampground(params.id);
  if (!campground) return;

  const session = await auth();
  if (!session?.user) return;

  if (!campground.author.id === session.user.id) return;

  return (
    <div>
      <form action={actions.updateCampground.bind(null, params.id)}>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">Edit {campground.title}</h2>
          <Input
            defaultValue={campground.title}
            type="text"
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Give a title for your campground"
            isRequired
          />
          <Textarea
            defaultValue={campground.description}
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Give a description for your campground"
            isRequired
          />
          <Input
            defaultValue={campground.price}
            type="price"
            name="price"
            label="Price"
            labelPlacement="outside"
            placeholder="Price of your campground"
            isRequired
          />
          <Input
            defaultValue={campground.location}
            type="text"
            name="location"
            label="Location"
            labelPlacement="outside"
            isRequired
            placeholder="Location of your campground"
          />
          <CheckboxGroup label="Select images to delete" name="deleteImages">
            <div className="m-2 flex flex-wrap gap-6">
              {campground.images.map((img, i) => (
                <div key={img}>
                  <Checkbox
                    value={img}
                    color="danger"
                    className="rounded-lg data-[selected=true]:outline outline-red-500"
                  >
                    <Image
                      src={`https://res.cloudinary.com/dr34dquqh/image/upload/w_400/q_auto/f_auto/v1727972503/${img}`}
                      height={125}
                      width={125}
                      loading="eager"
                      className="object-cover"
                    />
                  </Checkbox>
                </div>
              ))}
            </div>
          </CheckboxGroup>
          <Button type="submit" className="w-40">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
