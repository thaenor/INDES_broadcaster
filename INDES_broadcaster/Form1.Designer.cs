namespace INDES_broadcaster
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.youtubePlayer = new System.Windows.Forms.WebBrowser();
            this.YoutubePlaylist = new System.Windows.Forms.ListBox();
            this.youtubeInput = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // youtubePlayer
            // 
            this.youtubePlayer.Location = new System.Drawing.Point(0, 0);
            this.youtubePlayer.MinimumSize = new System.Drawing.Size(20, 20);
            this.youtubePlayer.Name = "youtubePlayer";
            this.youtubePlayer.Size = new System.Drawing.Size(398, 214);
            this.youtubePlayer.TabIndex = 0;
            this.youtubePlayer.Url = new System.Uri("", System.UriKind.Relative);
            // 
            // YoutubePlaylist
            // 
            this.YoutubePlaylist.FormattingEnabled = true;
            this.YoutubePlaylist.Location = new System.Drawing.Point(12, 220);
            this.YoutubePlaylist.Name = "YoutubePlaylist";
            this.YoutubePlaylist.Size = new System.Drawing.Size(183, 329);
            this.YoutubePlaylist.TabIndex = 1;
            // 
            // youtubeInput
            // 
            this.youtubeInput.Location = new System.Drawing.Point(12, 569);
            this.youtubeInput.Name = "youtubeInput";
            this.youtubeInput.Size = new System.Drawing.Size(183, 20);
            this.youtubeInput.TabIndex = 2;
            this.youtubeInput.Text = "Add Youtube Videos here";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(12, 595);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 3;
            this.button1.Text = "Queue";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1016, 997);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.youtubeInput);
            this.Controls.Add(this.YoutubePlaylist);
            this.Controls.Add(this.youtubePlayer);
            this.MinimumSize = new System.Drawing.Size(1024, 1024);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.WebBrowser youtubePlayer;
        private System.Windows.Forms.ListBox YoutubePlaylist;
        private System.Windows.Forms.TextBox youtubeInput;
        private System.Windows.Forms.Button button1;
    }
}

