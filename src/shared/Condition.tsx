export const Condition = ({ when, is, children }: {when: any, is: any, children: React.ReactElement}) => {
    if(when === is) {
      return (children)
    } else { return null };
  }