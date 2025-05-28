"use client";

import { useEffect, useState } from "react";
import { removeBookmark, getExistBookmark, addBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isBook, setIsBook] = useState<boolean>(bookmarked);
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertColor, setAlertColor] = useState<"green" | "red">("green");

  useEffect(() => {
    const checkBookmark = async () => {
      const exists = await getExistBookmark(id);
      setIsBook(exists);
    };
    checkBookmark();
  }, [id]);

  const handleBookmark = async () => {
    if (isBook) {
      await removeBookmark(id, pathname);
      setIsBook(false);
      setAlertText("Bookmark removed!");
      setAlertColor("red");
    } else {
      await addBookmark(id, pathname);
      setIsBook(true);
      setAlertText("Bookmark added!");
      setAlertColor("green");
    }

    // Hide alert after 3 seconds
    setTimeout(() => setAlertText(null), 3000);
  };

  return (
    <article className="companion-card relative z-10" style={{ backgroundColor: color }}>
      {alertText && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow ${
            alertColor === "green"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alertText}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={isBook ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
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
        <button className="btn-primary w-full justify-center">Launch Lesson</button>
      </Link>
    </article>
  );
};

export default CompanionCard;
