package cardindex.client.view;

import com.google.gwt.user.client.ui.*;

public class ViewMaster extends Composite implements ClickListener {

	private HorizontalSplitPanel mainPanel = new HorizontalSplitPanel();
	private cardindex.client.model.ObjectFactory objectFactory;
//	private ObjectFactory objectFactory;
//	private Label loadingLabel = new Label("loading...");
//	private LoadingPanel loading = new LoadingPanel(new Label("loading..."));

	public ViewMaster() {
		initWidget( mainPanel );
//		setStyleName("databaseEditorView");
//		RoundedPanel rounded = new RoundedPanel( "#f0f4f8" );
//		rounded.setWidget(treeList);
//		rounded.setWidth("100%");
//		mainPanel.setLeftWidget( rounded );
		mainPanel.setSplitPosition( "12em" );
//		treeList.addItem( storyItems );
//		treeList.addItem( userItems );
//		treeList.addTreeListener(this);
		RootPanel.get().add( this );
		objectFactory = new cardindex.client.model.ObjectFactory( this );
	}

	public void onClick( Widget oSender ) {
		if ( oSender instanceof LinkBase )
			((LinkBase)oSender).onClick();
	}

	public void onLoaded() {
		mainPanel.setLeftWidget( new ViewMenu( this ) );
	}

	public void setMainPane( Widget view ) {
		mainPanel.setRightWidget( view );
	}

	public void onError( String error ){
		PopupPanel popup = new PopupPanel( true );
		popup.setStyleName( "error" );
		popup.setWidget( new HTML( error ) );
		popup.show();
		popup.center();
	}

	public cardindex.client.model.ObjectFactory getObjectFactory() {
		return objectFactory;
	}

}
