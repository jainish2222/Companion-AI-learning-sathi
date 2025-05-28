"use client";
import { removeBookmark, getExistBookmark, addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked: initialBookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    const checkBookmark = async () => {
      const exists = await getExistBookmark(id);
      setIsBookmarked(exists);
    };
    checkBookmark();
  }, [id]);

  const handleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark(id, pathname);
      setIsBookmarked(false);
      console.log("remove");
    } else {
      await addBookmark(id, pathname);
      setIsBookmarked(true);
      console.log("add");
    }
  };

  return (
    <article className="companion-card relative z-10" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;