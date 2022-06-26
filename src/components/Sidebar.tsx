import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-700">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Class Schedule
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(({ id, title, slug, availableAt, lessonType }) => {
          return (
            <Lesson
              key={id}
              title={title}
              slug={slug}
              availableAt={new Date(availableAt)}
              type={lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
}
