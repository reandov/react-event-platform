import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' of 'MMMM' • 'h':'mm' 'aaaa'"
  );

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`}>
      <span className="text-gray-300 group">{availableDateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 transition-colors group-hover:border-green-500 ${
          isActiveLesson && "bg-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={`text-s font-medium flex items-center gap-2 ${
                isActiveLesson ? "text-white" : "text-blue-500"
              }`}
            >
              <CheckCircle size={20} />
              Released Content
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Soon
            </span>
          )}

          <span
            className={`text-xs rounded py-[0.125rem] px-2 text-white border font-bold ${
              isActiveLesson ? "border-white" : "border-green-300"
            }`}
          >
            {props.type === "live" ? "LIVE" : "CLASS"}
          </span>
        </header>

        <strong
          className={`mt-5 block ${
            isActiveLesson ? "text-white" : "text-gray-200 "
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
