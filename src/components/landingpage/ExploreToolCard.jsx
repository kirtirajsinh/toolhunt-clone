import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Balancer from "react-wrap-balancer";

const ExploreToolCard = ({
  id,
  imageUrl,
  title,
  source,
  rating,
  featured,
  content,
  tags,
}) => {
  const router = useRouter();
  console.log(
    id,
    imageUrl,
    title,
    source,
    rating,
    featured,
    content,
    tags,
    "tags from the explore Card page"
  );
  return (
    <div className="w-full bg-secondary-background p-4 rounded-lg flex gap-6 relative overflow-hidden cursor-pointer flex-wrap md:flex-nowrap">
      <div className="w-full md:max-w-[354px] md:max-h-[200px]">
        <Image
          src={imageUrl}
          width={354}
          height={185}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <div>
          <div className="flex gap-3 items-center mb-2">
            <h4
              className="font-semibold text-lg hover:text-primary-button cursor-pointer"
              onClick={() => router.push(`/tool/${id}`)}
            >
              {title}
            </h4>
            <span onClick={(e) => e.stopPropagation()}>
              <Image
                src="/icons/redirect.svg"
                className="cursor-pointer"
                width={16}
                height={16}
                alt={title}
                onClick={() => window.open(source)}
              />
            </span>
            <div className="flex gap-2 items-center">
              <Image src="/icons/star.svg" width={16} height={16} alt="" />
              <span>{rating}</span>
            </div>
            {featured && (
              <div className="flex items-center py-1 px-3 bg-secondary rounded-full">
                <span className="font-medium text-xs text-tertiary-button">
                  Featured
                </span>
              </div>
            )}
            <div
              className="ml-auto flex gap-2 absolute right-0 top-0 px-2 py-1"
              style={{
                background: "var(--primary-button)",
              }}
            >
              <Image
                src="/icons/star-circular.svg"
                width={14}
                height={14}
                alt=""
              />
              Premium
            </div>
          </div>
          <p className="font-light text-sm w-full lg:w-[80%] mb-6 text-secondary-text">
            {content}
          </p>
        </div>
        <div className="mt-auto w-full">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            {tags && (
              <div className="flex gap-2 flex-wrap w-fit">
                {/* show max. 8 tags */}
                {tags?.slice(0, 4).map((tag) => {
                  return (
                    <Link
                      key={tag.id}
                      href={`/category/${tag.title}`}
                      className="bg-secondary rounded-sm text-tertiary-button px-2 py-1 font-light text-sm hover:bg-tertiary-button hover:text-secondary"
                    >
                      {tag.title}
                    </Link>
                  );
                })}
              </div>
            )}
            <div className="flex items-center ml-auto mt-1 self-start">
              <div className="flex gap-1 items-center">
                <Image
                  src="/icons/logo.svg"
                  width={16}
                  height={16}
                  alt=""
                  className="w-4 h-4"
                />
                <span className="font-light text-sm">157.4k</span>
              </div>
              <Image
                src="/icons/heart.svg"
                width={16}
                height={16}
                alt=""
                className="cursor-pointer w-4 h-4 ml-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreToolCard;
