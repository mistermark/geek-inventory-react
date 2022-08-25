import { FormattedNumber } from 'react-intl';
import dayjs from 'dayjs';

import Icon from '../../../shared/Icon';
import { RefUrl } from '../../../types';
import { stateIcons } from '../../../utils';
import { CollectionItemDetailsHeader } from './CollectionItemDetailsHeader';
import { CollectionItemDetailsList } from './CollectionItemDetailsList';
import { CollectionItemDetailsListItem } from './CollectionItemDetailsListItem';

type CollectionItemDetailsNendoroidProps = {
  item: any;
  onDelete: Function
};

export const CollectionItemDetailsNendoroid = ({
  item,
  onDelete
}: CollectionItemDetailsNendoroidProps) => {
  return (
    <>
      {/* <CollectionItemDetailsHeader
        title={item.name}
        suptitle={item.number}
        icon={stateIcons[item.state || 'unknown']}
        itemId={item._id}
        onDelete={onDelete}
      /> */}
      <CollectionItemDetailsList>
        <>
          <CollectionItemDetailsListItem label="Series">
            {item.series}
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Manufacturer">
            {item.manufacturer}
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Release Date">
            {dayjs(item.release_date).format('YYYY/MM/DD')}
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Quantity">
            {item.quantity}
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Price">
            <FormattedNumber
              value={item.price.amount}
              // eslint-disable-next-line react/style-prop-object
              style="currency"
              currency={item.price.currency}
            />
          </CollectionItemDetailsListItem>
          {item.link ? 
          <CollectionItemDetailsListItem label="Link(s)">
            <ul className="list-none">
              {/* {item.links.map((link: RefUrl) => ( */}
                <li className="flex items-center mb-1">
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline text-blue-700"
                  >
                    {item.link.name}
                  </a>
                  <Icon icon="BiLinkExternal" className="ml-1 w-4 h-4"></Icon>
                </li>
              {/* ))} */}
            </ul>
          </CollectionItemDetailsListItem>
          : null }
        </>
      </CollectionItemDetailsList>
    </>
  );
};
