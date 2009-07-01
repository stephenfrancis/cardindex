package cardindex.client;

import cardindex.client.model.Type;

import com.google.gwt.user.client.rpc.AsyncCallback;

public interface CardIndexServiceAsync {

	public void getRootType( AsyncCallback<Type> oCallback );

	public void saveType( Type oType, AsyncCallback<String> oCallback );

	public void search( String strSearch, AsyncCallback<java.util.Vector<String[]>> oCallback );

}
