type ItemDetailsHeaderProps = {
    children: React.ReactElement
}

export const ItemDetailsHeader = ({children}: ItemDetailsHeaderProps) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex justify-between">
        {children}
      </div>
    </div>
  );
};
