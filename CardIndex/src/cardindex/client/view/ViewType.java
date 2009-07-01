package cardindex.client.view;
import cardindex.client.model.Attribute;
import cardindex.client.model.Type;
import com.google.gwt.core.client.*;
import com.google.gwt.user.client.ui.*;

public class ViewType extends ViewBase {

	protected String strType;
	protected Type oThisType;
	Grid oCurrentTypeAttrGrid = null;

	public ViewType( ViewMaster master, String strType ) {
		super( master );
		this.strType = strType;
		oThisType = master.getObjectFactory().getRootType().getTypeByFullId( strType );
		int iLevels = oThisType.getLevel()+1;
		GWT.log( "Type Id: " + strType + ", levels: " + iLevels, null );
		setTitle( "Type: " + oThisType.getFullId() );
		Grid oGrid = new Grid( iLevels, 1 );
		oGrid.setBorderWidth( 1 );
		oGrid.setCellPadding( 4 );
		Type oLevelType = oThisType;
		for ( int iX = iLevels-1; iX >= 0; iX-- ) {
			int iY = 1, iAttrs = oLevelType.getAttributeCount(), iRows = iAttrs+1;
			if ( iX == iLevels-1 )
				iRows++;
			GWT.log( "Level: " + oLevelType.getFullId()
				+ ", " + oLevelType.getAttributeCount(), null );
			Grid oAttrGrid = new Grid( iRows, 2 );
			java.util.Iterator<Attribute> it = oLevelType.getAttributes();
			oAttrGrid.setText( 0, 0, oLevelType.getFullId() );
			oAttrGrid.setText( 0, 1, iAttrs + " Attribute(s)" );
			while ( it != null && it.hasNext() ) {
				Attribute oAttribute = it.next();
				TextBox oTextBox = new TextBox();
				oTextBox.setText( oAttribute.getId() );
				oTextBox.setReadOnly( iX < iLevels-1 );
				oAttrGrid.setWidget( iY, 0, oTextBox );
//				Type oAttrType = oAttribute.getType();
//				if ( oAttrType != null )
				if ( iX == iLevels-1 ) {
					ListBox oListBox = makeTypeDropDown( oAttribute.getType() );
//					oListBox.setText( oAttribute.getType() );
					oAttrGrid.setWidget( iY, 1, oListBox );
				} else {
					oTextBox = new TextBox();
					oTextBox.setText( oAttribute.getType() );
					oTextBox.setReadOnly( iX < iLevels-1 );
					oAttrGrid.setWidget( iY, 1, oTextBox );
				}
				iY++;
				GWT.log( "Outputting:" + oLevelType.getFullId()
					+ ", " + oAttribute.getId(), null );
			}
				
			if ( iX == iLevels-1 ) {
				TextBox oNewAttr = new TextBox();
				ListBox oListBox = makeTypeDropDown( "" );
				oAttrGrid.setWidget( iY, 0, oNewAttr );
				oAttrGrid.setWidget( iY, 1, oListBox );
				oCurrentTypeAttrGrid = oAttrGrid;
			}
			oLevelType = oLevelType.getParent();
			oGrid.setWidget( iX, 0, oAttrGrid );
		}
		addToMainPane( oGrid );
		addToMainPane( new TypeButton() );
	}

	private class TypeButton extends ClickButton {
		private TypeButton() {
			super( "Save" );
		}
		@Override
		public void onButtonClick() {
			if ( oCurrentTypeAttrGrid == null ) {
				GWT.log( "Missing Current Attr Grid", null );
				return;
			}
			if ( oThisType == null ) {
				GWT.log( "Missing Current Attr Grid", null );
				return;
			}
			int iChanges = 0, iX = 1;
			while ( iX <= oThisType.getAttributeCount() ) {
				Attribute oAttr = oThisType.getAttribute( iX-1 );
				String strAttrName = ((TextBox)oCurrentTypeAttrGrid.getWidget( iX, 0 )).getText();
				if ( !strAttrName.equals( oAttr.getId() ) ) {
					oAttr.setId( strAttrName );
					iChanges++;
				}
				ListBox oListBox = (ListBox)oCurrentTypeAttrGrid.getWidget( iX, 1 );
				String strAttrType = null;
				for ( int iY = 0; iY < oListBox.getItemCount(); iY++ )
					if ( oListBox.isItemSelected( iY ) )
						strAttrType = oListBox.getItemText( iY );
				if ( !strAttrType.equals( oAttr.getType() ) ) {
					oAttr.setType( strAttrType );
					iChanges++;
				}
				iX++;
			}
			String strNewAttr = ((TextBox)oCurrentTypeAttrGrid.getWidget( iX, 0 )).getText();
			if ( !strNewAttr.equals( "" ) ) {
				iChanges++;
				ListBox oListBox = (ListBox)oCurrentTypeAttrGrid.getWidget( iX, 1 );
				String strAttrType = null;
				for ( int iY = 0; iY < oListBox.getItemCount(); iY++ )
					if ( oListBox.isItemSelected( iY ) )
						strAttrType = oListBox.getItemText( iY );
				oThisType.setAttribute( strNewAttr, strAttrType );
				iChanges++;			
			}
			setMessage( iChanges + " change(s) detected" );
			cardindex.client.CardIndexServiceAsync oService =
				(cardindex.client.CardIndexServiceAsync)com.google.gwt.core.client.GWT.create(cardindex.client.CardIndexService.class);
			oService.saveType( oThisType, new com.google.gwt.user.client.rpc.AsyncCallback<String>() {
				public void onSuccess( String strMessage ) {
					setMessage( strMessage );
				}
	
				public void onFailure( Throwable t ) {
					setMessage( "Error: " + t.toString() );
				}
			} );
		}
	}
	
	public ListBox makeTypeDropDown( String strCurrVal ) {
		ListBox oListBox = new ListBox();
		addTypesToListBox( oListBox, master.getObjectFactory().getRootType(), strCurrVal );
		oListBox.setVisibleItemCount( 1 );			// make into a drop-down
		return oListBox;
	}
	
	public void addTypesToListBox( ListBox oListBox, Type oType, String strCurrVal ) {
		oListBox.addItem( oType.getFullId() );
		if ( oType.getFullId().equals( strCurrVal ) )
			oListBox.setItemSelected( oListBox.getItemCount()-1, true );
		java.util.Iterator<Type> it = oType.getChildren();
		while ( it != null && it.hasNext() )
			addTypesToListBox( oListBox, it.next(), strCurrVal );
	}

}
