import {FormattedNumber} from 'react-intl';
import dayjs from 'dayjs';

import Icon from '../../shared/Icon';
import { stateIcons } from '../../utils';
import { RefUrl } from '../../types';

type CollectionItemDetailsVideoGameProps = {
  item: any;
};

export const CollectionItemDetailsVideoGame = ({
  item,
}: CollectionItemDetailsVideoGameProps) => {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{item.platform}</p>
        <div className='flex justify-between items-start'>
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex-1 pr-3">
            {item.name}
          </h3>
          <div>
            <Icon icon={stateIcons[item.state]} className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Genre(s)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.genre.map((genre: string, i: number, row: string[]) => {
                return (i + 1) === row.length ? genre : `${genre}, `;
              })}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Developer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.developer}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Release Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {dayjs(item.release_date).format('YYYY-MM-DD')}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Rating</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.rating}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Price</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {/* eslint-disable-next-line react/style-prop-object */}
              <FormattedNumber value={item.price} style="currency" currency={item.currency} />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Quantity</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.quantity}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">EAN</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.ean}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Link(s)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className='list-none'>
              {item.links.map((link: RefUrl) => (
                <li className='flex items-center mb-1'>
                  <a href={ link.url } className="underline hover:no-underline text-blue-700">{ link.name }</a>
                  <Icon icon="BiLinkExternal" className='ml-1 w-4 h-4'></Icon>
                </li>
              ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};
