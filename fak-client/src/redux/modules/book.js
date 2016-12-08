import update from 'react-addons-update'

const LOAD = 'book/LOAD';
const LOAD_SUCCESS = 'book/LOAD_SUCCESS';
const LOAD_FAIL = 'book/LOAD_FAIL';
const EDIT_START = 'book/EDIT_START';
const EDIT_STOP = 'book/EDIT_STOP';
const SAVE = 'book/SAVE';
const SAVE_SUCCESS = 'book/SAVE_SUCCESS';
const SAVE_FAIL = 'book/SAVE_FAIL';
const DEL = 'book/DEL';
const DEL_SUCCESS = 'book/DEL_SUCCESS';
const DEL_FAIL = 'book/DEL_FAIL';

const initialState = {
  loaded: false,
  editing: {show: false, book: null},
  saveError: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          book: action.book,
          show: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          book: null,
          show: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = update(state.data, {$unshift: [action.result]})
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          show: false
        },
        saveError: {
          ...state.saveError,
          text: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          text: action.error
        }
      } : state;
    case DEL:
      return state; // 'saving' flag handled by redux-form
    case DEL_SUCCESS:
      const newData = state.data.filter((book) => book.id !== action.id );
      return {
        ...state,
        data: newData,
        saveError: {
          ...state.saveError,
          text: null
        }
      };
    case DEL_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          text: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.book && globalState.book.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/strapi/book') // params not used, just shown as demonstration
  };
}

export function save(book) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/strapi/book', {
      data: book
    })
  };
}

export function deleteBook(book) {
  return {
    types: [DEL, DEL_SUCCESS, DEL_FAIL],
    id: book.id,
    promise: (client) => client.del('/strapi/book/' + book.id, {
      data: book
    })
  };
}

export function editStart(book) {
  return { type: EDIT_START, book };
}

export function editStop(book) {
  return { type: EDIT_STOP, book };
}
