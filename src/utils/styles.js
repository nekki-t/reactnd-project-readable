export const appStyles = {
  appBar: {
    backgroundColor: '#3F51B5',
  },
  title: {
    cursor: 'pointer'
  },
  main: {
    width: '70%',
    margin: '15px auto',
  }
};

export const loginStyles = {
  loginErrorText: {
    color: 'red',
  },
  linkToTheOther: {
    fontSize: 14,
  },
  loginColor: {
    color: 'rgb(0, 188, 212)',
    fontWeight: '900'
  },
  createColor: {
    color: 'rgb(255, 64, 129)',
    fontWeight: '900'
  },
};

export const loadingStyles = {
  onProgress: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 10000,
    backgroundColor: 'rgba(56, 56, 56, 0.7)',
  },
  circlularArea: {
    textAlign: 'center',
    height: '100vh',
    width: '100vw',
    display: 'table-cell',
    verticalAlign: 'middle'
  }
};

export const commentStyles = {
  editArea: {
    backgroundColor: '#f9f9f9'
  },
  actionButton: {
    marginLeft: 20,
  }
};

export const detailsStyles = {
  text: {
    backgroundColor: '#ffe2ea',
    fontFamily: "'Acme', sans-serif",
    fontSize: 16,
    wordWrap: 'break-word',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  noDataActionArea: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  commentArea: {
    height: '400px',
    overflowY: 'scroll',
    backgroundColor: '#f6f6f6',
    padding: 10,
  },
  comments: {
    display: 'flex',
    alignItems: 'center',
    count: {
      marginLeft: 5,
    }
  },
  commentsCard: {
    marginTop: 5,
  },
  comment: {
    width: '60%',
    padding: 10,
    marginBottom: 10,
  },
  commentActionArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commentBody: {
    marginBottom: 10,
    wordWrap: 'break-word',
    fontFamily: "'Acme', sans-serif",
    fontSize: 16,
  },
  commentInfo: {
    fontSize: 12,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5,
    header: {
      color: '#ff1271',
      marginRight: 5,
    },
    postedAt: {},
    author: {
      marginLeft: 20
    }
  },
  commentVoteActionArea: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  voteArea: {
    display: 'flex',
    alignItems: 'center',
  },
  commentIconSize: {
    width: 20,
    height: 20,
  },
  commentIconButtonSize: {
    width: 40,
    height: 40,
    padding: 10,
  },
  commentButtons: {
    width: 50
  },
  actionButton: {
    marginLeft: 20,
  },
  confirmDeleteCommentCard: {
    marginTop: 20,
  },
};

export const mainStyles = {
  toolbar: {
    marginBottom: 20,
  },
  toolbarTitle: {
    marginLeft: 0,
  },
  sortMenuTitle: {
    cursor: 'pointer',
  },
  gridList: {
    height: '80vh',
    overflowY: 'auto',
    alignContent: 'flex-start'
  },
  card: {
    marginBottom: 20,
  },
  cardText: {
    padding: 0
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 25
  },
};

export const postStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submit: {
    marginLeft: 10
  },
  topPageButton: {
    marginLeft: 10
  },
};

export const postActionsStyles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
  cardActionsLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  cardActionsRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commentIcon: {
    marginLeft: 20,
  },
  backButton: {
    marginLeft: 20
  },
};

export const postTitleStyles = {
  cardCategory: {
    fontSize: '14pt',
    color: '#51ff3a',
    textShadow: '2px 2px 2px #000',
    height: 20,
    title: {
      color: '#baffd6',
      marginRight: 5,
      fontSize: 14,
      fontWeight: 400,
    },
  },
  avatar: {
    fontWeight: '900',
    marginRight: 10,
  },
  postTitle: {
    textShadow: '2px 2px 2px #000',
    fontFamily: "'Acme', sans-serif",
    fontSize: 18,
  },
  cardTitle: {
    display: 'flex',
    fontSize: 18,
  },
  cardHeader: {
    backgroundColor: '#535353',
    color: '#ccc',
    padding: '5px 10px',
    textAlign: 'right'
  },
  subtitle: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  author: {
    marginLeft: 20
  },
  comments: {
    display: 'flex',
    alignItems: 'center',
    count: {
      marginLeft: 5,
      color: '#fff',
      textShadow: '2px 2px 2px #000',
    }
  },
  postedInfo: {
    display: 'flex',
    textShadow: '2px 2px 2px #000',
    title: {
      color: '#baffd6',
      marginRight: 5,
    },
    text: {
      color: '#fff',
    }
  },
};

export const sideBarStyles = {
  drawer: {
    backgroundColor: 'rgba(24, 26, 27, 0.5)',
    appBar: {
      backgroundColor: '#FF4081',
    },
    title: {
      cursor: 'pointer',
    }
  },
};

export const deleteDialogStyles = {
  actionButton: {
    marginLeft: 20,
  },
};