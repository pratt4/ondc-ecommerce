// export const BPPStruct = {
//     target: string;
//     sdk_version: string;
//     created_on: {
//       seconds: number;
//       nanoseconds: number;
//     };
//     bpp_uri: string;
//     bpp_id: string;
//     business_data: {
//       short_desc: string;
//       disabled_timestamp: string;
//       fulfillments: {
//         contact: {
//           email: string;
//           phone: string;
//         };
//       }[];
//       disabled: boolean;
//       ttl: string;
//       fssai_license_no: string;
//       business_serviceability: {
//         location_id: string;
//         category_id: string;
//         value: {
//           pincodes: any;
//           radius: number;
//           country: any;
//         };
//         type: string;
//       }[];
//       locations: {
//         address: {
//           state: string;
//           street: string;
//           area_code: string;
//           city: string;
//         };
//         delivery_radius: {
//           lat: string;
//           unit: string;
//           radius: string;
//           lon: string;
//         };
//         id: string;
//         lat: string;
//         code: any;
//         lon: string;
//         timings: {
//           schedule: {
//             holidays: any[];
//             times: any;
//             frequency: any;
//           };
//           range: {
//             start: string;
//             end: string;
//           };
//           days: string;
//         };
//       }[];
//       name: string;
//       images: string[];
//       long_desc: string;
//       symbol: string;
//       code: any;
//       items: {
//         support_contacts: any;
//         id: string;
//         cod_available: string;
//         cancellable: string;
//         composition: string;
//         returnable: string;
//         symbol: string;
//         long_desc: string;
//         category: string;
//         return_window: string;
//         mrp: number;
//         code: string;
//         location_id: string;
//         price: number;
//         item_name: string;
//         short_desc: string;
//         seller_pickup_return: string;
//         parent_item_id: string;
//         fulfillment_id: string;
//         images: string[];
//         time_to_ship: string;
//       }[];
//     };
//   }

// const allCartsStruct = [{
//   storeName: '',
//   selectedProducts: [{
// storeId: '',
// storeName: '',
// storeImageUrl: '',
//     productId: '',
//     productName: '',
//     productImageUrl: '',
// productPrice : '',
//     selectedQtys: ''
//   }]
// }]

export const passTime = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  if (win != null) {
    win.focus();
  }
};

export const processPrice = (price) => `₹ ${(price/100).toLocaleString()}`
