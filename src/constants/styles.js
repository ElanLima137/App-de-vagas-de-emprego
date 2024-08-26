import { StyleSheet } from "react-native"; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 0,
  },
  campoInput: {
    height: 40,
    width: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: 250,
    marginBottom: 20,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 10,
    marginBottom: 0,
  },
  checkedBox: {
    backgroundColor: '#239089',
  },
  checkboxText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
    width: 300,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  userInfoText: {
    flex: 1,
  },
  dashboardButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: 250,
    marginBottom: 10,
  },
  dashboardButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  barraContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#007bff',
    position: 'absolute',
  },
  textobarraContainer: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchBarTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  searchBarIcon: {
    marginRight: 10,
  },
  searchBarTop: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 10,
    width: 300,
  },
  vagaContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  vagaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vagaDescricao: {
    fontSize: 14,
    marginVertical: 8,
  },
  vagaLocalizacao: {
    fontSize: 12,
    color: '#555',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 8,
  },
  localizacao: {
    fontSize: 14,
    color: '#555',
  },
  box : {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    padding: 10, 
    borderRadius: 20,
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

    buttonSubscribed: {
    backgroundColor: '90EE90',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 250,

  },

    buttonText: {
    color: 'white',
    textAlign: 'center',

  },


});

export default styles;