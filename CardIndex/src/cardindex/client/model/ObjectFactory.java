package cardindex.client.model;
import cardindex.client.CardIndexService;
import cardindex.client.CardIndexServiceAsync;

public class ObjectFactory {

	private cardindex.client.view.ViewMaster master;
	private Type rootType = null;
	
	public ObjectFactory( cardindex.client.view.ViewMaster master ) {
		this.master = master;
		initialLoad();
	}
	
	private void initialLoad() {
		CardIndexServiceAsync oService =
			(CardIndexServiceAsync)com.google.gwt.core.client.GWT.create(CardIndexService.class);
		oService.getRootType( new com.google.gwt.user.client.rpc.AsyncCallback<Type>() {
			public void onSuccess( Type oRoot ) {
				rootType = oRoot;
				master.onLoaded();			
			}
			public void onFailure( Throwable t ) {
				master.onError( t.toString() );
			}
		} );
	}
		
	public Type getRootType() {
		return rootType;
	}

}
