'use client';

/**
 * A post from X, embedded rather than re-hosted.
 *
 * Uses X's official iframe endpoint (platform.twitter.com/embed/Tweet.html),
 * not their widget script: the media stays served by X, the author keeps the
 * attribution and the click, and we add no third-party JavaScript to the page.
 * Requires `frame-src https://platform.twitter.com` in _headers — see the note
 * there. `loading="lazy"` keeps it off the wire until the reader scrolls to it.
 */
export function CourseTweet({
  id,
  author,
  href,
  caption,
  height = 560,
}: {
  id: string;
  author: string;
  href: string;
  caption?: React.ReactNode;
  /**
   * Frame height in px. Paired with `scrolling="no"`: sized to show the post
   * and its media, and to stop short of the like/reply bar, which we cannot
   * style (cross-origin) and do not want mid-lesson. Tune per post — too short
   * clips the video, which is worse than showing the bar.
   */
  height?: number;
}) {
  return (
    <figure className="course-tweet">
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=dark&dnt=true&conversation=none`}
        title={`Post by ${author} on X`}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        className="course-tweet-frame"
        style={{ height }}
      />
      <figcaption className="course-tweet-cite">
        {caption ? <span>{caption} </span> : null}
        <a href={href} target="_blank" rel="noopener noreferrer">
          {author} on X <span aria-hidden>↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
