package cardindex.client.view;
import com.google.gwt.user.client.ui.*;

public class ViewSearch extends ViewBase {

	public ViewSearch( ViewMaster view, String strSearch ) {
		super( view );
		cardindex.client.CardIndexServiceAsync oService =
			(cardindex.client.CardIndexServiceAsync)com.google.gwt.core.client.GWT.create( cardindex.client.CardIndexService.class );
		oService.search( strSearch, new com.google.gwt.user.client.rpc.AsyncCallback<java.util.Vector<String[]>>() {
			public void onSuccess( java.util.Vector<String[]> vOut ) {
				setTitle( "Search Results" );
				setMessage( vOut.size() + " match(es) found" );
				Grid oGrid = new Grid( vOut.size(), 1 );
				addToMainPane( oGrid );
				oGrid.setBorderWidth( 1 );
				oGrid.setCellPadding( 4 );
				for ( int iX = 0; iX < vOut.size(); iX++ ) {
					String[] strOut = vOut.get( iX );
					String strItem = strOut[0];
					if ( strItem.equals( "type" ) )
						oGrid.setWidget( iX, 0, new LinkType( master, strOut[1], strOut[1] ) );
					else if ( strItem.equals( "type_attr" ) )
						oGrid.setWidget( iX, 0, new LinkType( master, strOut[1], strOut[2] ) );
				}
			}

			public void onFailure( Throwable t ) {
				setMessage( "Error: " + t.toString() );
			}
		} );
	}


}
