package cardindex.client;
import com.google.gwt.core.client.*;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class CardIndex implements EntryPoint {
	cardindex.client.view.ViewMaster master = new cardindex.client.view.ViewMaster();

	public void onModuleLoad() {
	}



	/**
   * This is the entry point method.
   */
/*
		VerticalPanel oMenuPanel = null, oRightPanel = null, oMainPanel = null;
		Type oRootType = null, oThisType = null;;
		Label oTitleLabel = null;
		Label oMessageLabel = null;
		Grid oCurrentTypeAttrGrid = null;
		TextBox oSearchBox = null;

	public void onModuleLoad() {
		oMenuPanel  = new VerticalPanel();
		oRightPanel = new VerticalPanel();
		HorizontalSplitPanel oHSPanel = new HorizontalSplitPanel();
		RootPanel.get().add( oHSPanel );
		oHSPanel.setSplitPosition( "12em" );
		oHSPanel.setLeftWidget( oMenuPanel );
		oHSPanel.setRightWidget( oRightPanel );
		oTitleLabel = new Label();
		oRightPanel.add( oTitleLabel );
		oMessageLabel = new Label();
		oRightPanel.add( oMessageLabel );

		oSearchBox = new TextBox();
		oMenuPanel.add( oSearchBox );
		LinkButton oButton = new LinkButton( "search", "Global Search" );
		oMenuPanel.add( oButton );

		CardIndexServiceAsync oService =
			(CardIndexServiceAsync)com.google.gwt.core.client.GWT.create(CardIndexService.class);
		oService.getRootType( new com.google.gwt.user.client.rpc.AsyncCallback<Type>() {
			public void onSuccess( Type oRoot ) {
				oRootType = oRoot;
				TreeItem oRootItem = doTypeNode( oRoot );
			    Tree oTree = new Tree();
			    oTree.addItem( oRootItem );
			    oMenuPanel.add( oTree );
			}

			public void onFailure( Throwable t ) {
				oMessageLabel.setText( "Error: " + t.toString() );
			}

			private TreeItem doTypeNode( Type oType ) {
				LinkAnchor oAnchor = new LinkAnchor( "type",
					oType.getFullId(), oType.getId() );
				TreeItem oItem = new TreeItem( oAnchor );
				oItem.setState( true );		// Expanded I think
				java.util.Iterator<Type> it = oType.getChildren();
				while ( it != null && it.hasNext() )
					oItem.addItem( doTypeNode( it.next() ) );
				return oItem;
			}
		} );

	}

	public class LinkAnchor extends Anchor {
		private String strItem, strKey;
		public LinkAnchor( String strItem, String strKey, String strText ) {
			super( strText );
			this.strItem = strItem;
			this.strKey  = strKey;
			addClickListener( CardIndex.this );
		}
		public String getItem() {
			return strItem;
		}
		public String getKey() {
			return strKey;
		}
	}
	
	public class LinkButton extends Button {
		private String strItem;
		public LinkButton( String strItem, String strText ) {
			super( strText );
			this.strItem = strItem;
			addClickListener( CardIndex.this );
		}
		public String getItem() {
			return strItem;
		}
	}

	public void onClick( Widget oSender ) {
		if ( oSender instanceof LinkAnchor ) {
			LinkAnchor oAnchor = (LinkAnchor)oSender;
			String strItem = oAnchor.getItem();
			String strKey  = oAnchor.getKey();
			if ( strItem.equals( "type" ) )
				showType( strKey );
		} else if ( oSender instanceof LinkButton ) {
			LinkButton oButton = (LinkButton)oSender;
			String strItem = oButton.getItem();
			if ( strItem.equals( "search" ) )
				showCardSearch();
			else if ( strItem.equals( "type_save" ) )
				saveType();
		}
	}

	public void showType( String strType ) {
		if ( oMainPanel != null )
			oRightPanel.remove( oMainPanel );
		oMainPanel = new VerticalPanel();
		oRightPanel.add( oMainPanel );
		oThisType = oRootType.getTypeByFullId( strType );
		int iLevels = oThisType.getLevel()+1;
		GWT.log( "Type Id: " + strType + ", levels: " + iLevels, null );
		oTitleLabel.setText( "Type: " + oThisType.getFullId() );
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
		oMainPanel.add( oGrid );
		LinkButton oSave = new LinkButton( "type_save", "Save" );
		oMainPanel.add( oSave );
	}

	public void showCardSearch() {
		String strSearch = oSearchBox.getText();
		if ( strSearch == null || strSearch.length() < 3 ) {
			oMessageLabel.setText( "Search string not long enough" );
			return;
		}
		CardIndexServiceAsync oService =
			(CardIndexServiceAsync)com.google.gwt.core.client.GWT.create(CardIndexService.class);
		oService.search( strSearch, new com.google.gwt.user.client.rpc.AsyncCallback<java.util.Vector<String[]>>() {
			public void onSuccess( java.util.Vector<String[]> vOut ) {
				oMessageLabel.setText( "Search results..." );
				if ( oMainPanel != null )
					oRightPanel.remove( oMainPanel );
				oMainPanel = new VerticalPanel();
				oRightPanel.add( oMainPanel );
				Grid oGrid = new Grid( vOut.size(), 1 );
				oMainPanel.add( oGrid );
				oGrid.setBorderWidth( 1 );
				oGrid.setCellPadding( 4 );
				for ( int iX = 0; iX < vOut.size(); iX++ ) {
					String[] strOut = vOut.get( iX );
					String strItem = strOut[0];
					LinkAnchor oAnchor = new LinkAnchor( strItem, strOut[1], strOut[1] );
					oGrid.setWidget( iX, 0, oAnchor );
				}
			}

			public void onFailure( Throwable t ) {
				oMessageLabel.setText( "Error: " + t.toString() );
			}
		} );
	}

	public void saveType() {
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
		oMessageLabel.setText( iChanges + " change(s) detected" );
		CardIndexServiceAsync oService =
			(CardIndexServiceAsync)com.google.gwt.core.client.GWT.create(CardIndexService.class);
		oService.saveType( oThisType, new com.google.gwt.user.client.rpc.AsyncCallback<String>() {
			public void onSuccess( String strMessage ) {
				oMessageLabel.setText( strMessage );
			}

			public void onFailure( Throwable t ) {
				oMessageLabel.setText( "Error: " + t.toString() );
			}
		} );
	}
	
	public ListBox makeTypeDropDown( String strCurrVal ) {
		ListBox oListBox = new ListBox();
		addTypesToListBox( oListBox, oRootType, strCurrVal );
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
*/
}