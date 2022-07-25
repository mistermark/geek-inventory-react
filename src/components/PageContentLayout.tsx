function PageContentLayout(props: { children: React.ReactNode}) {
    return (
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {props.children}
          </div>
        </main>
    )
}

export default PageContentLayout;