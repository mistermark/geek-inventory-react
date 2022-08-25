type CollectionItemDetailsHeaderProps = {
    children: React.ReactElement
}

export const CollectionItemDetailsHeader = ({children}: CollectionItemDetailsHeaderProps) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex justify-between">
        {children}
      </div>
    </div>
  );
};
