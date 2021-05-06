import { Machine, assign } from "xstate";

export const authMachine = Machine({
  id: 'authentication',
  initial: 'unauthorized',
  context: {
    newLink: "/login",
    errorMessage: "",
  },
  states: {
    unauthorized: {
      on: {
        LOGIN: 'loading',
      }
    },
    loading: {
      on: {
        LOGIN_SUCCESS: {
          target: 'authorized',
          actions: ['onSuccess'],
        },
        LOGIN_ERROR: {
          target: 'unauthorized',
          actions: ['onError']
        },
        LOGIN_EMPTY: {
          target: 'unauthorized',
          actions: ['onError']
        }
      }
    },
    authorized: {
      on: {
        LOGOUT: {
          target: 'unauthorized',
          actions: ['onLogout'],
        },
      }
    }
  }
}, {
  actions: {
    onSuccess: async (context, event) => {
      if (event.response) {
        context.newLink = "/bunadarskra"
      } else {
        context.newLink = "/login"
      }
      context.errorMessage = "";
    },
    onError: (context, event) => {
      if (event.response) {
        context.newLink = "/login"
      } else {
        context.newLink = "/login"
      }
      context.errorMessage = event.errorMessage;
    },
    onLogout: (context, event) => {
      context.newLink = "/"
    }
  }
});


export const fetchMachine = Machine({
  id: "fetchMachine",
  initial: "pending",
  context: {
    results: [],
    message: "",
  },
  states: {
    pending: {
      entry: ['fetchData'],
      on: {
        RESOLVE: {
          target: "successful",
          actions: ['setResults']
        },
        REJECT: {
          target: "failed",
          actions: ['setMessage']
        },
      }
    },
    failed: {
      on: {
        FETCH: "pending"
      }
    },
    successful: {
      on: {
        FETCH: "pending"
      }
    }
  }
}, {
  actions: {
    setResults: assign((ctx, event) => ({
      results: event.results
    })),
    setMessage: assign((ctx, event) => ({
      message: event.message
    }))
  }
});

export const addItemMachine = Machine({
  id: "addItemMachine",
  initial: "step1",
  states: {
    step1: {
      on: {
        NEXT: "step2",
        CLOSE: "closing"
      }
    },
    step2: {
      on: {
        NEXT: "step3",
        GOBACK: "step1",
        CLOSE: "closing"
      }
    },
    step3: {
      on: {
        NEXT: "step4",
        GOBACK: "step2",
        CLOSE: "closing"
      }
    },
    step4: {
      on: {
        START_AGAIN: "closing"
      },
    },
    closing: {
      after: {
        1800: "step1",
      }
    }
  }
});

export const toggleViews = Machine({
  id: "toggleViews",
  initial: "grid",
  states: {
    list: {
      on: {
        TOGGLE_GRID: "grid",
      }
    },
    grid: {
      on: {
        TOGGLE_LIST: "list"
      }
    }
  }
});

