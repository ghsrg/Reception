import { DisplayMode } from '@microsoft/sp-core-library';
import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';
import ISPUser from '../../SPUser/ISPUser';

interface ITodoContainerProps {
  dataProvider: ITodoDataProvider;
  currentUser:ISPUser;
  webPartDisplayMode: DisplayMode;
  configureStartCallback: () => void;
}

export default ITodoContainerProps;