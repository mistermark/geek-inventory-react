import {FormattedNumber} from 'react-intl';

import Icon from '../../shared/Icon';
import { RefUrl } from '../../types';
import { stateIcons } from '../../utils';

type CollectionItemDetailsNendoroidProps = {
  item: any;
};

export const CollectionItemDetailsNendoroid = ({
  item,
}: CollectionItemDetailsNendoroidProps) => {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{item.number}</p>
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
            <dt className="text-sm font-medium text-gray-500">Series</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.series}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Manufacturer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.manufacturer}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Release Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.release_date}
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
