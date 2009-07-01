package cardindex.client.view;
import cardindex.client.model.Type;
import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.*;

public class ViewMenu extends ViewBase {

	private TextBox oSearchBox;

	public ViewMenu( ViewMaster master ) {
		super( master );
		oSearchBox = new TextBox();
		addToMainPane( oSearchBox );
		addToMainPane( new SearchButton() );

		TreeItem rootItem = doTypeNode( master.getObjectFactory().getRootType() );
		Tree oTree = new Tree();
		oTree.addItem( rootItem );
		addToMainPane( oTree );
	}

	private TreeItem doTypeNode( Type oType ) {
		TreeItem oItem = new TreeItem( new LinkType( master, oType.getFullId(), oType.getId() ) );
		GWT.log( "Adding type to tree:" + oType.getId() + ":", null );
//		oItem.addItem(  );
		oItem.setState( true );						// Expanded
		java.util.Iterator<Type> it = oType.getChildren();
		while ( it != null && it.hasNext() )
			oItem.addItem( doTypeNode( it.next() ) );
		return oItem;
	}

	private class SearchButton extends ClickButton {
		private SearchButton() {
			super( "Global Search" );
		}
		@Override
		public void onButtonClick() {
			GWT.log( "ViewMenu.onButtonClick: " + toString(), null );
			String strSearch = oSearchBox.getText();
			master.setMainPane( new ViewSearch( master, strSearch ) );
		}
	}

}
