import { FormattedNumber } from 'react-intl';
import dayjs from 'dayjs';

import Icon from '../../shared/Icon';
import { RefUrl } from '../../types';
import { stateIcons } from '../../utils';
import { ItemDetailsHeader } from './ItemDetailsHeader';
import { ItemDetailsList } from './ItemDetailsList';
import { ItemDetailsListItem } from './ItemDetailsListItem';

type ItemDetailsNendoroidProps = {
  item: any;
  onDelete: Function
};

export const ItemDetailsNendoroid = ({
  item,
  onDelete
}: ItemDetailsNendoroidProps) => {
  return (
    <>
      {/* <CollectionItemDetailsHeader
        title={item.name}
        suptitle={item.number}
        icon={stateIcons[item.state || 'unknown']}
        itemId={item._id}
        onDelete={onDelete}
      /> */}
      <ItemDetailsList>
        <>
          <ItemDetailsListItem label="Series">
            {item.series}
          </ItemDetailsListItem>
          <ItemDetailsListItem label="Manufacturer">
            {item.manufacturer}
          </ItemDetailsListItem>
          <ItemDetailsListItem label="Release Date">
            {dayjs(item.release_date).format('YYYY/MM/DD')}
          </ItemDetailsListItem>
          <ItemDetailsListItem label="Quantity">
            {item.quantity}
          </ItemDetailsListItem>
          <ItemDetailsListItem label="Price">
            <FormattedNumber
              value={item.price.amount}
              // eslint-disable-next-line react/style-prop-object
              style="currency"
              currency={item.price.currency}
            />
          </ItemDetailsListItem>
          {item.link ? 
          <ItemDetailsListItem label="Link(s)">
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
          </ItemDetailsListItem>
          : null }
        </>
      </ItemDetailsList>
    </>
  );
};
