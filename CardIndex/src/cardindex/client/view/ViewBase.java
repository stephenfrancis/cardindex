package cardindex.client.view;
import com.google.gwt.user.client.ui.*;

public class ViewBase extends Composite implements ClickListener {

	protected ViewMaster master;
	private VerticalPanel mainPanel = new VerticalPanel();
	private Label titleLabel = null, messageLabel = null;

	public ViewBase( ViewMaster master ) {
		this.master = master;
		initWidget( mainPanel );
		titleLabel = new Label();
		mainPanel.add( titleLabel );
		messageLabel = new Label();
		mainPanel.add( messageLabel );
	}

	public void onClick( Widget widget ) {
		if ( widget instanceof ClickButton )
			onButtonClick( (ClickButton)widget );
	}
	
	public void onButtonClick( ClickButton clickButton ) {}

	public ViewMaster getViewMaster() {
		return master;
	}

	public void setTitle( String strTitle ) {
		if ( titleLabel != null )
			titleLabel.setText( strTitle );
	}
	
	public void setMessage( String strMessage ) {
		if ( messageLabel != null )
			messageLabel.setText( strMessage );		
	}

	public void addToMainPane( Widget widget ) {
		mainPanel.add( widget );
	}
}
