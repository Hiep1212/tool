import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.Properties;

public class HcoinCounter extends JFrame {
    private int count = 0;
    private JLabel counterLabel;
    private Properties properties;
    private File configFile;

    public HcoinCounter() {
        // Thiết lập cửa sổ chính
        setTitle("Tool MINHHIEPSIGMA - Java Version");
        setSize(350, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);

        // Tải cấu hình
        loadConfig();

        // Tạo giao diện
        initUI();

        // Hiển thị cửa sổ
        setVisible(true);
    }

    private void initUI() {
        // Panel chính
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BorderLayout(10, 10));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        mainPanel.setBackground(new Color(30, 30, 30));

        // Tiêu đề
        JLabel titleLabel = new JLabel("Tool MINHHIEPSIGMA", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setForeground(new Color(76, 175, 80));
        mainPanel.add(titleLabel, BorderLayout.NORTH);

        // Panel counter
        JPanel counterPanel = new JPanel();
        counterPanel.setLayout(new BorderLayout());
        counterPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        counterPanel.setBackground(new Color(37, 37, 37));
        counterPanel.setForeground(Color.WHITE);

        JLabel descLabel = new JLabel("Số link Hcoin đã nhận", SwingConstants.CENTER);
        descLabel.setForeground(Color.LIGHT_GRAY);
        counterPanel.add(descLabel, BorderLayout.NORTH);

        counterLabel = new JLabel(String.valueOf(count), SwingConstants.CENTER);
        counterLabel.setFont(new Font("Arial", Font.BOLD, 48));
        counterLabel.setForeground(new Color(76, 175, 80));
        counterPanel.add(counterLabel, BorderLayout.CENTER);

        mainPanel.add(counterPanel, BorderLayout.CENTER);

        // Panel nút bấm
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(1, 2, 10, 0));
        buttonPanel.setBackground(new Color(30, 30, 30));

        JButton addButton = new JButton("Nhận Hcoin");
        styleButton(addButton, new Color(76, 175, 80));
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                count++;
                counterLabel.setText(String.valueOf(count));
                saveConfig();
                animateCounter();
            }
        });

        JButton resetButton = new JButton("Reset");
        styleButton(resetButton, new Color(244, 67, 54));
        resetButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int confirm = JOptionPane.showConfirmDialog(
                        HcoinCounter.this,
                        "Bạn có chắc chắn muốn reset số lượng Hcoin?",
                        "Xác nhận Reset",
                        JOptionPane.YES_NO_OPTION);
                
                if (confirm == JOptionPane.YES_OPTION) {
                    count = 0;
                    counterLabel.setText(String.valueOf(count));
                    saveConfig();
                    resetAnimation();
                }
            }
        });

        buttonPanel.add(addButton);
        buttonPanel.add(resetButton);
        mainPanel.add(buttonPanel, BorderLayout.SOUTH);

        add(mainPanel);
    }

    private void styleButton(JButton button, Color color) {
        button.setFont(new Font("Arial", Font.BOLD, 16));
        button.setBackground(color);
        button.setForeground(Color.WHITE);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(10, 0, 10, 0));
    }

    private void animateCounter() {
        Timer timer = new Timer(50, new ActionListener() {
            float scale = 1.0f;
            boolean growing = true;
            
            @Override
            public void actionPerformed(ActionEvent e) {
                if (growing) {
                    scale += 0.1f;
                    if (scale >= 1.3f) growing = false;
                } else {
                    scale -= 0.1f;
                    if (scale <= 1.0f) {
                        scale = 1.0f;
                        ((Timer)e.getSource()).stop();
                    }
                }
                counterLabel.setFont(new Font("Arial", Font.BOLD, (int)(48 * scale)));
            }
        });
        timer.start();
    }

    private void resetAnimation() {
        Timer timer = new Timer(50, new ActionListener() {
            int x = 0;
            int direction = 5;
            
            @Override
            public void actionPerformed(ActionEvent e) {
                x += direction;
                if (Math.abs(x) >= 15) direction *= -1;
                if (x == 0) {
                    ((Timer)e.getSource()).stop();
                    counterLabel.setForeground(new Color(76, 175, 80));
                }
                counterLabel.setLocation(x, counterLabel.getY());
            }
        });
        counterLabel.setForeground(new Color(244, 67, 54));
        timer.start();
    }

    private void loadConfig() {
        properties = new Properties();
        configFile = new File("hcoin_config.properties");
        
        try {
            if (configFile.exists()) {
                FileInputStream fis = new FileInputStream(configFile);
                properties.load(fis);
                fis.close();
                count = Integer.parseInt(properties.getProperty("hcoinCount", "0"));
            }
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
    }

    private void saveConfig() {
        try {
            properties.setProperty("hcoinCount", String.valueOf(count));
            FileOutputStream fos = new FileOutputStream(configFile);
            properties.store(fos, "Hcoin Counter Configuration");
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Sử dụng giao diện hệ thống cho đẹp
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new HcoinCounter();
            }
        });
    }
}