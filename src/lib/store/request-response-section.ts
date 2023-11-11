import { writable } from "svelte/store";
import type {
  NewTab,
  CurrentTab,
  BasicAuth,
  ApiKey,
} from "$lib/utils/interfaces/request.interface";

//this store is for collaps and expand section
export const collapsibleState = writable(false);

//this is for horizaontal and vertical mode
export const isHorizontalVertical = writable(false);

//store for Api Request ------>here i will store all new request
const initialRequest = [
  {
    url: "",
    method: "",
    body: "",
    headers: "",
    request: "",
  },
];
export const apiRequest = writable(initialRequest);

export const currentTab = writable<CurrentTab>({ id: null });
export const tabs = writable<NewTab[]>([]);

let tabStore: NewTab[] = [];
tabs.subscribe((value) => {
  console.log(value);
  tabStore = value;
});

export const updateCurrentTab = (value) => {
  currentTab.set(value);
};

export const handleTabAddons = (newTab: NewTab) => {
  const requestAlreadyExist = tabStore.filter((elem) => {
    if (elem.id === newTab.id) return true;
    else return false;
  });
  if (requestAlreadyExist.length === 0) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    tabs.update((value: any) => {
      return [...value, newTab];
    });
    updateCurrentTab({ id: newTab.id });
  } else {
    updateCurrentTab({ id: requestAlreadyExist[0].id });
  }
};

export const handleTabRemove = (id: string) => {
  tabs.update((value) => {
    const filteredTabs = value.filter((elem) => {
      if (elem.id === id) return false;
      else return true;
    });
    return [...filteredTabs];
  });
  if (tabStore.length > 0) {
    updateCurrentTab({ id: tabStore[tabStore.length - 1].id });
  } else {
    updateCurrentTab({ id: null });
  }
};

export const handleTabUpdate = (obj, id) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem = { ...elem, ...obj };
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const updateQueryParams = (params, id) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.queryParams = params;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const updateURL = (url, id) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.url = url;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const handleRawDataChange = (raw: string, id: string) => {
  tabs.update((value) => {
    const temp = value.map((elem) => {
      if (elem.id === id) {
        elem.request.body.raw = raw;
      }
      return elem;
    });
    return temp;
  });
};

export const updateUrlEncode = (urlencode, id: string) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.body.urlencoded = urlencode;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const updateFormDataText = (formdatatext, id: string) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.body.formdata.text = formdatatext;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const updateFormDataFile = (formdatafile, id: string) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.body.formdata.file = formdatafile;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const handleRequestStateChange = (
  tab: string,
  property: string,
  id: string,
) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.state[property] = tab;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const handleRequestAuthChange = (
  data: string | BasicAuth | ApiKey,
  property: string,
  id: string,
) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request.auth[property] = data;
      }
      return elem;
    });
    return [...updatedTab];
  });
};

export const handleRequestChange = (data, property, id) => {
  tabs.update((value: any) => {
    const updatedTab = value.map((elem) => {
      if (elem.id === id) {
        elem.request[property] = data;
      }
      return elem;
    });
    return [...updatedTab];
  });
};
