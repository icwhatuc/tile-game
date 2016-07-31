import _ from 'lodash';
import {connect} from 'react-redux'
import App from '../components/App'

function mapStateToProps(state, ownProps) {
    return _.assign({}, state, ownProps);
}

const AppConnector = connect(mapStateToProps)(App)

export default AppConnector;

