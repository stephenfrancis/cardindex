package cardindex.client.view;
import com.google.gwt.user.client.ui.*;

public class ButtonBase extends Button {

	private ViewMaster view;
	
	public ButtonBase( ViewMaster view, String strText ) {
		super( strText );
		this.view = view;
		addClickListener( view );
	}

	public void onClick() {}

	public ViewMaster getViewMaster() {
		return view;
	}

}
