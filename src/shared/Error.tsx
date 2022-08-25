export const Error = ({
  children,
}: {
  children: React.ReactElement | string;
}) => <p className="text-red-800">{children}</p>;
