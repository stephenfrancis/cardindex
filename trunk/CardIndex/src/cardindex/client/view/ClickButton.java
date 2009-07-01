package cardindex.client.view;
import com.google.gwt.user.client.ui.*;

public class ClickButton extends Button implements ClickListener {

	public ClickButton( String strText ) {
		super( strText );
		addClickListener( this );
	}

	public void onClick( Widget widget ) {
		if ( widget != this )
			throw new RuntimeException( "ClickButton can only be its own Listener" );
		onButtonClick();
	}

	public void onButtonClick() {}
}
