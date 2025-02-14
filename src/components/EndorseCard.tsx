type EndorseCardProps = {
  name: string;
  title: string;
  description: string;
  photo: string;
  profileLink: string;
};

const EndorseCard = ({
  name,
  description,
  photo,
  profileLink,
  title,
}: EndorseCardProps) => {
  return (
    <div
      key={name}
      className="flex h-full flex-col justify-center bg-white px-6 py-6 dark:bg-gray-800"
    >
      <p className="mb-8">
        {'"'}
        {description}
        {'"'}
      </p>

      <div className="flex">
        <img
          src={photo}
          alt="endorser"
          className="mr-4 h-10 w-10 rounded-full"
        />

        <div>
          <p className="font-semibold">
            <a
              href={profileLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline hover:no-underline"
            >
              {name}
            </a>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default EndorseCard;
